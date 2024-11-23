import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import useZodForm from "./use-zod-form";
import { useMutationData } from "./use-mutation-data";
import {
  getWorkspaceFolders,
  getWorkSpaces,
  moveVideoLocation,
} from "@/actions/workspace";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.folders);
  const { workspaces } = useAppSelector((state) => state.workspaces);

  const [isFetching, setIsFetching] = useState(false);

  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);
  const [isWorkspaces, setIsWorkspaces] = useState<
    { type: "PERSONAL" | "PUBLIC"; name: string; id: string }[] | undefined
  >(undefined);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    async (data: { folder_id: string; workspace_id: string }) => {
      return await moveVideoLocation(
        videoId,
        data.workspace_id,
        data.folder_id
      );
    }
  );

  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    async (data) => {
      try {
        mutate(data);
      } catch (error) {
        console.error("Error moving video:", error);
      }
    },
    { folder_id: null, workspace_id: currentWorkspace }
  );

  const fetchFolders = async (workspace: string) => {
    const folders = await getWorkspaceFolders(workspace);
    setIsFolders(folders.data.folders);
  };
  const fetchWorkspaces = async () => {
    const workspaces = await getWorkSpaces();
    setIsWorkspaces(workspaces.data?.workspace);
  };

  useEffect(() => {
    let isActive = true;

    const fetchFoldersAndWorkspaces = async (currentWorkspace: string) => {
      setIsFetching(true);
      try {
        await Promise.all([fetchFolders(currentWorkspace), fetchWorkspaces()]);
      } finally {
        if (isActive) {
          setIsFetching(false);
        }
      }
    };

    fetchFoldersAndWorkspaces(currentWorkspace);

    return () => {
      isActive = false;
    };
  }, [currentWorkspace]);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) {
        fetchFolders(value.workspace_id);
      }
    });

    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    isFetching,
    isFolders,
    workspaces,
    isWorkspaces,
  };
};
