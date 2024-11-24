import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getAllWorkspaceVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar.tsx";
import GlobalHeader from "@/components/global/global-header";
type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { workspaceId: string };
};

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const auth = await onAuthenticateUser();

  if (!auth.user?.workspace) {
    redirect("/auth/sign-in");
  }
  if (!auth.user.workspace.length) {
    redirect("/auth/sign-in");
  }

  const hasAccess = await verifyAccessToWorkspace(params.workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) {
    return null;
  }

  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(params.workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(params.workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ["workspace-videos"],
    queryFn: () => getAllWorkspaceVideos(params.workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={params.workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workspace={hasAccess.data.workspace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
