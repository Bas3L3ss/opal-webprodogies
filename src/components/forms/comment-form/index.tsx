"use client";
import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/use-videos";
import { Send, X } from "lucide-react";
import React from "react";

type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};

const CommentForm = ({ author, videoId, commentId, close }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  );
  /* TODOS: make the comment form UI looks better as well as the comment cards */
  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
      {!close && (
        <Button
          className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent"
          type="submit"
        >
          <Loader state={isPending}>
            <Send
              className="text-white/50 cursor-pointer hover:text-white/80"
              size={18}
            />
          </Loader>
        </Button>
      )}
      <div className="flex gap-2 mt-2">
        {close && (
          <>
            <Button
              className="flex items-center p-2    transition"
              type="submit"
              variant={"ghost"}
            >
              <Loader state={isPending}>
                <Send className="mr-1" size={18} />
                Send
              </Loader>
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center p-2   transition"
              type="button"
              onClick={close}
            >
              <X className="mr-1" size={18} />
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
