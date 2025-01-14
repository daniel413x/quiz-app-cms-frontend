import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/common/shadcn/alert-dialog";
import { QUIZ_ROUTE } from "@/lib/consts";
import { ResetIcon } from "@radix-ui/react-icons";
import {
  Check,
  Wand2,
} from "lucide-react";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface CreateSuccessAlertDialogProps {
  resetForm: () => void;
  children: ReactNode;
}

function CreateSuccessAlertDialog({
  resetForm,
  children,
}: CreateSuccessAlertDialogProps) {
  const {
    quizName,
    categoryName,
  } = useParams();
  const returnPath = `/${QUIZ_ROUTE}/${categoryName}/${quizName}`;
  const navigate = useNavigate();
  const returnToQuiz = () => {
    navigate(returnPath);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="border-stone-700"
        data-testid="success-modal"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-stone-700 text-center">
            Success
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex justify-center gap-1 text-green-700">
          <Check className="w-8 h-8 shrink-0" />
          <span className="font-semibold">
            Question added
          </span>
        </div>
        <AlertDialogFooter className="grid grid-cols-2 gap-1 items-center">
          <AlertDialogAction
            className="bg-stone-700 hover:bg-stone-600"
            onClick={resetForm}
          >
            <Wand2 className="w-5 h-5 mr-1" />
            New question
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-stone-700 hover:bg-stone-600"
            onClick={returnToQuiz}
          >
            <ResetIcon
              className="w-5 h-5 mr-1"
              type="button"
            />
            Exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateSuccessAlertDialog;
