import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "@/lib/email";

const combinedProviders = [
  ...authConfig.providers,
  Resend({
    from: "no-reply@rbeventos.org",
    sendVerificationRequest,
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: combinedProviders,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;  
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        if (account && account.provider === "google" && user.email) {
          const adminUser = await db.user.findFirst({
            where: { email: user.email, role: "ADMIN" },
          });

          if (adminUser) {
            return true;
          }

          const userEvents = await db.event.findFirst({
            where: { email: user.email },
          });

          if (!userEvents) {
            return false;
          }
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      try {
        await db.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
            image: user.image,
            name: user.name,
          },
        });
      } catch (error) {
        console.error("Error updating emailVerified:", error);
      }
    },
    async createUser({ user }) {
      try {
        await db.event.updateMany({
          where: { email: user.email },
          data: {
            userId: user.id,
          },
        });
        await db.notification.create({
          data: {
            message: `Nuevo usuario: '${user.email ? user.email : user.name}'`,
            link: "/admin/users",
            read: false,
          },
        });
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    },
  },
  pages: {
    signIn: "/authentication",
  },
});
