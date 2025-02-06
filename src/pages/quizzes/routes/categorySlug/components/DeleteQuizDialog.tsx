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
import { Quiz } from "@/lib/types";
import { useDeleteQuiz } from "@/lib/api/QuizApi";

interface DeleteQuizDialogProps {
  children: ReactNode;
  quiz: Quiz;
}

function DeleteQuizDialog({
  quiz,
  children,
}: DeleteQuizDialogProps) {
  const {
    deleteQuiz,
  } = useDeleteQuiz(quiz.id);
  const handleClickConfirm = async () => {
    await deleteQuiz();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="delete-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete quiz
            {" "}
            {`"${quiz.name}"?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex items-center gap-2 text-orange-700">
          <QuestionMarkCircledIcon className="w-8 h-8 shrink-0" />
          <span className="font-semibold">
            Are you sure you want to delete the quiz
            <br />
            {" \""}
            <span className="italic text-sm">
              {`/${quiz.slug}`}
            </span>
            {"\""}
            ?
          </span>
        </div>
        <div className="flex items-center gap-2 text-orange-700">
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

export default DeleteQuizDialog;
