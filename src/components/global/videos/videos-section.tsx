"use client";

import { getAllWorkspaceVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { WorkspaceVideosProps } from "@/types/index.type";
import React from "react";
import Loader from "../loader";
import VideoCard from "./video-card";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { cn } from "@/lib/utils";

const VideosSection = ({ workspaceId }: { workspaceId: string }) => {
  const { data, isPending } = useQueryData(["workspace-videos"], () =>
    getAllWorkspaceVideos(workspaceId)
  );

  const isDone = isPending;

  const { status, data: videos } = (data as WorkspaceVideosProps) || {
    status: 0,
    data: { videos: [] },
  };

  return (
    <div className="flex flex-col mt-4 gap-4" suppressHydrationWarning>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <Loader state={isDone}>
        <section
          className={cn(
            status !== 200
              ? "p-5"
              : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          )}
        >
          {status === 200 ? (
            videos.videos.map((video) => (
              <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
            ))
          ) : (
            <p className="text-[#BDBDBD]"> No videos in workspace</p>
          )}
        </section>
      </Loader>
    </div>
  );
};

export default VideosSection;
