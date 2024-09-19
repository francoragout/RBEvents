import { auth } from "@/auth";
import SubNavbar from "@/components/sub-navbar";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const EventLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!event) {
    return <div>Event not found</div>;
  }

  const session = await auth();

  return (
    <main>
      <SessionProvider session={session}>
        <SubNavbar event={event} />
        {children}
      </SessionProvider>
    </main>
  );
};

export default EventLayout;
