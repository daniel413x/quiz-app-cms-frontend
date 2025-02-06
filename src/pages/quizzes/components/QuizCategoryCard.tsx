import { Button } from "@/components/ui/common/shadcn/button";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { QUIZZES_ROUTE } from "@/lib/consts";
import { QuizCategory } from "@/lib/types";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateQuizCategoryDialog from "./CreateQuizCategoryDialog";
import DeleteQuizCategoryDialog from "./DeleteQuizCategoryDialog";

interface QuizCategoryCardProps {
  quizCategory: QuizCategory;
}

function QuizCategoryCard({
  quizCategory,
}: QuizCategoryCardProps) {
  const {
    domainSlug,
  } = useParams();
  return (
    <div className="flex items-center justify-between py-3">
      <Link
        className="w-full"
        to={`/${domainSlug}/${QUIZZES_ROUTE}/${quizCategory.slug}`}
      >
        {quizCategory.name}
      </Link>
      <div className="flex gap-2">
        <CreateQuizCategoryDialog quizCategory={quizCategory}>
          <Button className="flex gap-1" variant="outlineBold">
            <Pencil />
          </Button>
        </CreateQuizCategoryDialog>
        <DeleteQuizCategoryDialog
          quizCategory={quizCategory}
        >
          <Button className="flex gap-1" variant="outlineBold">
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
