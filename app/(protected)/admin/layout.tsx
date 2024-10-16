import { auth } from "@/auth";
import { db } from "@/lib/db";
import { subDays } from "date-fns";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedAdminLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  const today = new Date();
  const retentionPeriodDays = 30;
  const cutoffDate = subDays(today, retentionPeriodDays);

  await db.notification.deleteMany({
    where: {
      read: true,
      createdAt: {
        lt: cutoffDate,
      },
    },
  });

  if (session?.user?.role !== "ADMIN") {
    return <div>You are not admin</div>;
  }

  return <main>{children}</main>;
};

export default ProtectedAdminLayout;
