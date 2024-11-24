import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/use-folders";
import React, { useEffect } from "react";

/* TODOS: try to use shadcn Select component, maybe use Form to make it compatible */

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkSpace?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkSpace,
}: Props) => {
  const {
    register,
    isPending,
    onFormSubmit,
    isFetching,
    isFolders,
    errors,
    folders,
    workspaces,
  } = useMoveVideos(videoId, currentWorkSpace!);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkSpace);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onFormSubmit(e);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Workspace</Label>
            <p className="text-sm">
              {isFetching && (
                <span className="animate-pulse text-muted-foreground">
                  Loading...
                </span>
              )}
              {!isFetching && (workspace?.name || "-")}
            </p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Folder</Label>
            <p className="text-sm">
              {isFetching && (
                <span className="animate-pulse text-muted-foreground">
                  Loading...
                </span>
              )}
              {folder?.name || "This video has no folder"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            New Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Workspace</Label>
            {isFetching ? (
              <Skeleton className="h-10" />
            ) : (
              <select
                {...register("workspace_id")}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select workspace
                </option>

                {workspaces?.map((workspace) => (
                  <option
                    selected={workspace.id === currentWorkSpace}
                    key={workspace.id}
                    value={workspace.id}
                  >
                    {workspace.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {isFetching ? (
            <div className="space-y-2">
              <Label>Folder</Label>

              <Skeleton className="h-10" />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Folder</Label>
              {isFolders && isFolders.length > 0 ? (
                <div className="select-container">
                  <select
                    {...register("folder_id")}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select folder
                    </option>
                    {isFolders.map((folder) => (
                      <option
                        selected={folder.id === currentFolder}
                        key={folder.id}
                        value={folder.id}
                      >
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This workspace has no folders
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        disabled={isFetching || isPending}
        className="w-full"
        type="submit"
      >
        <Loader state={isFetching || isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
