import SubNavbar from "@/components/sub-navbar";
import { db } from "@/lib/db";

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

  return (
    <main>
      <SubNavbar event={event} />
      {children}
    </main>
  );
};

export default EventLayout;
