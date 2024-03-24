import type { Account, Profile } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { UserService } from "~/DAL/service";
import { User } from "~/DAL/models";
import CustomJWT from "~/types/custom-jwt";

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
        maxAge: Number(process.env.SESSION_MAX_AGE),
    },

    pages: {
        signIn: "/auth/signin",
    },

    callbacks: {
        async jwt({ token }: { token: CustomJWT }) {
            if (!token.hasOwnProperty("isAdmin")) {
                let id = undefined, isAdmin = false;
                if (token?.email) {
                    const user = await UserService.FindByEmail(token.email);
                    id = user?.id;
                    isAdmin = user?.isAdmin ?? false;
                    
                }
                token.id = id as number;
                token.isAdmin = isAdmin;
            }

            return token;
        },
        // async session({ session } : { session: Session }) {
        //     let isAdmin = false;
        //     if (session?.user?.email) {
        //         const user = await UserService.FindByEmail(session.user.email);
        //         isAdmin = user?.isAdmin ?? false;
        //     }

        //     session.isAdmin = isAdmin;

        //     return session;
        // },
        async signIn({ account, profile }: { account: Account | null, profile: Profile }) {
            if (!account) {
                return false;
            }

            const success = account.provider == "google" ? profile.email_verified : true;

            try {
                const result = await UserService.FindOrCreate({
                    username: `${account.provider}-${account.providerAccountId}`,
                    avatarUrl: typeof profile.picture === 'string' || (profile.picture as any) instanceof String ? profile.picture : null,
                    email: profile.email,
                    name: profile.name
                } as User);
    
                return success && result != null;
            } catch (err) {
                return `/auth/signin?error=${err}`;
            }
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