import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/use-folders";
import React, { useEffect } from "react";

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
    isWorkspaces,
    errors,
  } = useMoveVideos(videoId, currentWorkSpace!);

  const folder = isFolders?.find((f) => f.id === currentFolder);
  const workspace = isWorkspaces?.find((f) => f.id === currentWorkSpace);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onFormSubmit(e);
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

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
              {workspace?.name || (
                <span className="animate-pulse text-muted-foreground">
                  Loading...
                </span>
              )}
            </p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Folder</Label>
            <p className="text-sm">
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
              <Select
                defaultValue={currentWorkSpace}
                {...register("workspace_id")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  {isWorkspaces?.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {isFetching ? (
            <Skeleton className="h-10" />
          ) : (
            <div className="space-y-2">
              <Label>Folder</Label>
              {isFolders && isFolders.length > 0 ? (
                <Select defaultValue={currentFolder} {...register("folder_id")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {isFolders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This workspace has no folders
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Button className="w-full" type="submit">
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
