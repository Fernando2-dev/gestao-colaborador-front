import { URL_API_PRODUCAO } from "@/utils/constante";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: 'email', type: 'text' },
        senha: { label: 'senha', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${URL_API_PRODUCAO}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              senha: credentials?.senha,
            }),
          });

          const user = await res.json();

          if (res.ok) {
            return user;
          } else {
            redirect("/");
          }
        } catch (error) {
          redirect("/");
        }
      },
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  }
}


const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }