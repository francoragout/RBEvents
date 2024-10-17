import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import Resend from "next-auth/providers/resend";

const combinedProviders = [
  ...authConfig.providers,
  Resend({
    from: "no-reply@rbeventos.org",
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
        await db.notification.create({
          data: {
            message: `New User: '${user.name}'`,
            link: "/admin/users",
            read: false,
          },
        });
      } catch (error) {
        console.error("Error creating notification:", error);
      }
    },
  },
  pages: {
    signIn: "/authentication",
  },
});
