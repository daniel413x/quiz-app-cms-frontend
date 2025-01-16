import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/common/shadcn/alert-dialog";
import { ExclamationTriangleIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { QuizCategory } from "@/lib/types";
import { useDeleteQuizCategory } from "@/lib/api/QuizCategoryApi";

interface DeleteQuizCategoryDialogProps {
  children: ReactNode;
  quizCategory: QuizCategory;
}

function DeleteQuizCategoryDialog({
  quizCategory,
  children,
}: DeleteQuizCategoryDialogProps) {
  const {
    deleteQuizCategory,
  } = useDeleteQuizCategory(quizCategory.id);
  const handleClickConfirm = async () => {
    await deleteQuizCategory();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="delete-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Clear form
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex gap-1 text-orange-700">
          <QuestionMarkCircledIcon className="w-8 h-8 shrink-0" />
          <span className="font-semibold">
            Are you sure you want to delete the category
            {" "}
            <span className="italic text-sm">
              {`${quizCategory.name}`}
            </span>
            ?
          </span>
        </div>
        <div className="flex gap-1 text-orange-700">
          <ExclamationTriangleIcon className="w-8 h-8" />
          This is an irreversible action
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClickConfirm}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteQuizCategoryDialog;
