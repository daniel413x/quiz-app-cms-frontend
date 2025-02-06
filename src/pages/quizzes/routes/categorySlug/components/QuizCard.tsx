import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZZES_ROUTE } from "@/lib/consts";
import { Quiz } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateQuizDialog from "./CreateQuizDialog";
import DeleteQuizDialog from "./DeleteQuizDialog";

interface QuizCardProps {
  quiz: Quiz;
}

function QuizCard({
  quiz,
}: QuizCardProps) {
  const {
    domainSlug,
    categorySlug,
  } = useParams();
  return (
    <div className="flex items-center justify-between py-3">
      <Link
        className="w-full"
        to={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/${quiz.slug}`}
      >
        {quiz.name}
      </Link>
      <div className="flex gap-2">
        <CreateQuizDialog quiz={quiz}>
          <Button className="flex gap-1" variant="outlineBold">
            <Pencil />
          </Button>
        </CreateQuizDialog>
        <DeleteQuizDialog quiz={quiz}>
          <Button className="flex gap-1" variant="outlineBold">
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
