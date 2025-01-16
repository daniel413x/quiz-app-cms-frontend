import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZ_ROUTE } from "@/lib/consts";
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
    quizName,
    categoryName,
  } = useParams();
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <Link
        className="w-full"
        to={`/${QUIZ_ROUTE}/${categoryName}/${quizName}/${quizQuestion.id}`}
      >
        {quizQuestion.question}
      </Link>
      <div className="flex gap-2 items-center">
        <Link
          className="flex gap-1"
          to={`/${QUIZ_ROUTE}/${categoryName}/${quizName}/${quizQuestion.id}`}
        >
          <Pencil />
        </Link>
        <DeleteQuizDialog quizQuestion={quizQuestion}>
          <Button className="flex gap-1" variant="outline">
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
