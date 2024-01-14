import NextAuth, { Profile as AuthProfile } from "next-auth";

declare module "next-auth" {
    interface Profile extends AuthProfile {
        email_verified: boolean,
        picture: string
    }
}
