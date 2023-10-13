import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentaialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentaialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email }, });
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);

                console.log(`UserFound : ${user}`);


                return passwordsMatch ? user : null;




            }
        }),
        GoogleProvider({
            // esclamation in the end to tell typescript that we definately have the value for them otherwise it will show us the error.
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt"
    }
}