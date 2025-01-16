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
import { QuizQuestion } from "@/lib/types";
import { useDeleteQuizQuestion } from "@/lib/api/QuizQuestionApi";

interface DeleteQuizQuestionDialogProps {
  children: ReactNode;
  quizQuestion: QuizQuestion;
}

function DeleteQuizQuestionDialog({
  quizQuestion,
  children,
}: DeleteQuizQuestionDialogProps) {
  const {
    deleteQuizQuestion,
  } = useDeleteQuizQuestion(quizQuestion.id);
  const handleClickConfirm = async () => {
    await deleteQuizQuestion();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="delete-modal">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Quiz Question
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex gap-1 text-orange-700">
          <QuestionMarkCircledIcon className="w-8 h-8 shrink-0" />
          <span className="font-semibold">
            Are you sure you want to delete the quiz question
            {" "}
            <span className="italic text-sm">
              {`${quizQuestion.question}`}
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

export default DeleteQuizQuestionDialog;
