"use client";

import { signOut } from "next-auth/react";

const Page = () => {
    return (
        <div>
            <p>Hello</p>
            <button onClick={() => signOut()}>Log out</button>
        </div>
    );
};

export default Page;
