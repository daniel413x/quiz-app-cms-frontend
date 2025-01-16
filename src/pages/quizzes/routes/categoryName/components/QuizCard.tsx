import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZ_ROUTE } from "@/lib/consts";
import { QuizCategory } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateQuizDialog from "./CreateQuizDialog";
import DeleteQuizDialog from "./DeleteQuizDialog";

interface QuizCardProps {
  quiz: QuizCategory;
}

function QuizCard({
  quiz,
}: QuizCardProps) {
  const {
    categoryName,
  } = useParams();
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <Link
        className="w-full"
        to={`/${QUIZ_ROUTE}/${categoryName}/${quiz.name.toLowerCase()}`}
      >
        {quiz.name}
      </Link>
      <div className="flex gap-2">
        <CreateQuizDialog quiz={quiz}>
          <Button className="flex gap-1" variant="outline">
            <Pencil />
          </Button>
        </CreateQuizDialog>
        <DeleteQuizDialog quiz={quiz}>
          <Button className="flex gap-1" variant="outline">
            <Trash2 />
          </Button>
        </DeleteQuizDialog>
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
