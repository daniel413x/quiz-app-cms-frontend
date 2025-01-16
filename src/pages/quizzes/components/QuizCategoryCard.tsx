import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZ_ROUTE } from "@/lib/consts";
import { QuizCategory } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import CreateQuizCategoryDialog from "./CreateQuizCategoryDialog";
import DeleteQuizCategoryDialog from "./DeleteQuizCategoryDialog";

interface QuizCategoryCardProps {
  quizCategory: QuizCategory;
}

function QuizCategoryCard({
  quizCategory,
}: QuizCategoryCardProps) {
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <Link
        className="w-full"
        to={`/${QUIZ_ROUTE}/${quizCategory.name.toLowerCase()}`}
      >
        {quizCategory.name}
      </Link>
      <div className="flex gap-2">
        <CreateQuizCategoryDialog quizCategory={quizCategory}>
          <Button className="flex gap-1" variant="outline">
            <Pencil />
          </Button>
        </CreateQuizCategoryDialog>
        <DeleteQuizCategoryDialog
          quizCategory={quizCategory}
        >
          <Button className="flex gap-1" variant="outline">
            <Trash2 />
          </Button>
        </DeleteQuizCategoryDialog>
      </div>
    </div>
  );
}

export function QuizCategoryCardSkeleton() {
  return (
    <Skeleton className="w-full h-full" />
  );
}

export default QuizCategoryCard;
