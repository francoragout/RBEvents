import { db } from "@/lib/db";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ListChecks } from "lucide-react";

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
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {event?.name}
        </h1>
        
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ListChecks />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ListChecks />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ListChecks />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

          </TooltipProvider>
        
      </div>
      {children}
    </main>
  );
};

export default ProtectedLayout;
