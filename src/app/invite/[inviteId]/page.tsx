import { acceptInvite } from "@/actions/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    inviteId: string;
  };
};

const Page = async ({ params: { inviteId } }: Props) => {
  const invite = await acceptInvite(inviteId);

  if (invite.status === 404) return redirect("/auth/sign-in");

  if (invite?.status === 401) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p>You are not authorized to accept this invite</p>
        <Button variant={"link"} asChild>
          <Link href={"/"}>Back to landing page</Link>
        </Button>
      </div>
    );
  }

  if (invite?.status === 200) return redirect("/auth/callback");
  if (invite?.status === 500) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Failed</h2>
        <p>Something went wrong</p>
        <Button variant={"link"} asChild>
          <Link href={"/"}>Back to landing page</Link>
        </Button>
      </div>
    );
  }
};

export default Page;
