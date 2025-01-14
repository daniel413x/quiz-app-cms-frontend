import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContentFrameProps {
  children: ReactNode;
  mt?: boolean;
  mb?: boolean;
}

function ContentFrame({
  children,
  mt,
  mb,
}: ContentFrameProps) {
  return (
    <div className={cn("bg-white border-2 border-black md:p-10 py-4 px-6", {
      "mt-10": mt,
      "mb-10": mb,
    })}
    >
      {children}
    </div>
  );
}

export default ContentFrame;
