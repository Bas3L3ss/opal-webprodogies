import { TabsContent } from "@/components/ui/tabs";
import React from "react";

type Props = {
  transcript: string;
};

const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent
      value="Transcript"
      className="rounded-xl flex flex-col p-5 gap-y-6  "
    >
      <p className="text-[#a7a7a7]">
        {transcript || "There's no transcript for this video"}
      </p>
    </TabsContent>
  );
};

export default VideoTranscript;
