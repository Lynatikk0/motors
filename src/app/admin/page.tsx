import { auth } from "@/shared/lib/auth";
import { AdminDashboard } from "@/widgets/admin/ui/admin-dashboard";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return <AdminDashboard user={session.user} />;
}
