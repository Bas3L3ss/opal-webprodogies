import React from "react";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  text?: string;
  children?: React.ReactNode;
};

const Loader = ({ state, className, color, children, text }: Props) => {
  return state ? (
    <div className={cn("flex items-center", className)}>
      <Spinner color={color} />
      <span className="ml-2 text-sm text-muted-foreground">{text}</span>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;
