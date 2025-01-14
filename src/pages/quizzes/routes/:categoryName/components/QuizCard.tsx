import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZ_ROUTE } from "@/lib/consts";
import { QuizCategory } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuizCardProps {
  quiz: QuizCategory;
}

function QuizCard({
  quiz,
}: QuizCardProps) {
  return (
    <div className="flex items-center justify-between py-3 px-5 border border-input">
      <Link
        className="w-full"
        to={`/${QUIZ_ROUTE}/${quiz.name.toLowerCase()}`}
      >
        {quiz.name}
      </Link>
      <div className="flex gap-2">
        <Button className="flex gap-1" variant="outline">
          <Pencil />
        </Button>
        <Button className="flex gap-1" variant="outline">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export function QuizCardSkeleton() {
  return (
    <Skeleton className="w-full h-full" />
  );
}

export default QuizCard;
