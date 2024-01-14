import type { NextAuthOptions, Account, Profile } from "next-auth";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { UserService } from "~/server/service";
import { User } from "~/server/models";

export const authOptions = {
    providers: [
        // https://www.balbooa.com/help/gridbox-documentation/integrations/other/google-client-id
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID ?? "",
            clientSecret: process.env.FACEBOOK_SECRET ?? ""
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: "/auth/signin",
    },

    callbacks: {
        async signIn({ account, profile }: { account: Account | null, profile: Profile }) {
            if (!account) {
                return false;
            }

            const success = account.provider == "google" ? profile.email_verified : true;

            const result = await UserService.FindOrCreate({
                username: `${account.provider}-${account.providerAccountId}`,
                avatarUrl: typeof profile.picture === 'string' || (profile.picture as any) instanceof String ? profile.picture : null,
                email: profile.email,
                name: profile.name
            } as User);

            return success && result != null;
        },

        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) {
                return url;
            }
            return baseUrl;
        },
    }
} as never;

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };