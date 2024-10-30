import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import Resend from "next-auth/providers/resend";

const combinedProviders = [
  ...authConfig.providers,
  Resend({
    from: "rbeventos@rbeventos.org",
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
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      try {
        await db.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
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
