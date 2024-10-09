import { UsersColumns } from "@/components/admin/users/users-columns";
import { UsersTable } from "@/components/admin/users/users-table";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/validations";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

async function getUsers(): Promise<User[]> {
    const users = await db.user.findMany({
        include: {
            events: true,
        },
    });
  
    return users.map((user) => UserSchema.parse(user));
  }
  
  export default async function UsersPage() {
    const users = await getUsers();
  
    return <UsersTable data={users} columns={UsersColumns} />;
  }