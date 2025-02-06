import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZZES_ROUTE } from "@/lib/consts";
import { QuizQuestion } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DeleteQuizDialog from "./DeleteQuizDialog";

interface QuizQuestionCardProps {
  quizQuestion: QuizQuestion;
}

function QuizQuestionCard({
  quizQuestion,
}: QuizQuestionCardProps) {
  const {
    domainSlug,
    quizSlug,
    categorySlug,
  } = useParams();
  return (
    <div className="flex items-center justify-between py-3">
      <Link
        className="w-full"
        to={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/${quizSlug}/${quizQuestion.id}`}
      >
        {quizQuestion.question}
      </Link>
      <div className="flex gap-2 items-center">
        <Link
          className="flex items-center gap-1 border-2 border-input-dark h-9 px-4 py-2 rounded-md"
          to={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/${quizSlug}/${quizQuestion.id}`}
        >
          <Pencil />
        </Link>
        <DeleteQuizDialog quizQuestion={quizQuestion}>
          <Button className="flex gap-1" variant="outlineBold">
            <Trash2 />
          </Button>
        </DeleteQuizDialog>
      </div>
    </div>
  );
}

export function QuizQuestionCardSkeleton() {
  return (
    <Skeleton className="w-full h-full" />
  );
}

export default QuizQuestionCard;
