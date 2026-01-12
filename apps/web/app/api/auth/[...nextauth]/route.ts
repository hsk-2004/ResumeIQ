import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

const authHandler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "test@resumeiq.com" &&
          credentials?.password === "resume123"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: credentials.email,
          }
        }
        return null
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always allow redirect to /main after login
      if (url.startsWith(baseUrl)) return url
      return baseUrl + "/main"
    },
  },
})

export { authHandler as GET, authHandler as POST }
