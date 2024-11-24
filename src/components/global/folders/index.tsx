"use client";

import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/foldersSlice";

type Props = { workspaceId: string };

export type FoldersProps = {
  status: number;
  data: {
    folders: ({
      _count: {
        videos: number;
      };
    } & {
      id: string;
      name: string;
      createdAt: Date;
      workSpaceId: string | null;
    })[];
  };
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();

  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );
  const { status, data: folders } = data as FoldersProps;

  const { latestVariables } = useMutationDataState(["create-folder"]);

  if (isFetched && folders) dispatch(FOLDERS({ folders: folders.folders }));

  return (
    <div className="flex flex-col gap-4" suppressHydrationWarning>
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl"> Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <ScrollArea className="w-full  ">
        <ScrollBar orientation="horizontal" />
        <div
          className={cn(
            status !== 200 && "justify-center",
            "flex items-center gap-4  w-full"
          )}
        >
          {status !== 200 ? (
            <p className="text-neutral-300">No folders in workspace</p>
          ) : (
            <>
              {latestVariables && latestVariables.status === "pending" && (
                <Folder
                  name={latestVariables.variables.name}
                  id={latestVariables.variables.id}
                  optimistic
                />
              )}
              {folders.folders.map((folder) => (
                <Folder
                  name={folder.name}
                  count={folder._count.videos}
                  id={folder.id}
                  key={folder.id}
                />
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Folders;
