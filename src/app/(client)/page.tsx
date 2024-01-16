"use client";

import { signOut } from "next-auth/react";

const Page = () => {
    return (
        <div className="flex gap-1">
            <p>Hello</p>
            <button className="border p-1" onClick={() => signOut()}>Log out</button>
        </div>
    );
};

export default Page;
