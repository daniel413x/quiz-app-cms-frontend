import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./shadcn/skeleton";
import ContentFrame from "./ContentFrame";

interface PageHeaderProps {
  header: string;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
}

function PageHeader({
  header,
  isLoading,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <ContentFrame>
      <div className={cn("flex justify-between items-center", className)}>
        <h1 className="text-2xl font-bold flex-1 max-w-max">
          {isLoading ? (
            <Skeleton
              className="w-24 h-8 flex-1"
            />
          ) : header}
        </h1>
        {isLoading ? <Skeleton className="w-6 h-6" /> : icon}
      </div>
    </ContentFrame>
  );
}

export default PageHeader;
