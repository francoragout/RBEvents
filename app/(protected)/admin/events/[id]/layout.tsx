import { db } from "@/lib/db";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main>
      <div className="flex items-center space-x-4 mb-6 justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {event?.name}
        </h1>
      </div>
      {children}
    </main>
  );
};

export default ProtectedLayout;
