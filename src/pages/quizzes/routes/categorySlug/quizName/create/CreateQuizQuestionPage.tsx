import {
  ChevronLeft,
  Delete,
  Plus,
  UploadCloud,
  Wand2,
  X,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CREATE_QUIZ_QUESTION_ROUTE, QUIZZES_ROUTE } from "@/lib/consts";
import { QuizQuestion } from "@/lib/types";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/common/shadcn/button";
import useReturnToQueryResultsCallback from "@/lib/hooks/useReturnToQueryResultsCallback";
import {
  FormField, FormItem, FormLabel, FormMessage, Form,
  FormControl,
} from "@/components/ui/common/shadcn/form";
import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/common/shadcn/checkbox";
import { useCreateQuizQuestion, useGetQuizQuestion, useUpdateQuizQuestion } from "@/lib/api/QuizQuestionApi";
import LoadingSquares from "@/components/ui/common/LoadingSquares";
import ClearFormDialog from "./components/ClearFormDialog";
import CreateSuccessDialog from "./components/CreateSuccessDialog";
import TipTapEditor from "./components/TipTapEditor";

const answerSchema = {
  id: z.string(),
  quizQuestionId: z.optional(z.string()),
  answer: z.string(),
  correctAnswer: z.boolean(),
  order: z.optional(z.number().or(z.null())),
};

const formSchema = z.object({
  id: z.string(),
  question: z.string().min(1),
  answers: z.array(z.object(answerSchema)),
});

export type QuizQuestionForm = UseFormReturn<z.infer<typeof formSchema>, any, undefined>;

export type QuizQuestionFormValues = z.infer<typeof formSchema>;

function CreateQuizQuestionPage() {
  const {
    domainSlug,
    quizQuestionId,
    quizSlug,
    categorySlug,
  } = useParams();
  const createSuccessDialogTriggerRef = useRef<HTMLButtonElement>(null);
  const isCreatePage = quizQuestionId === CREATE_QUIZ_QUESTION_ROUTE;
  const initializedQuizAnswer = {
    id: uuid(),
    answer: "<p>Write your answer here</p>",
    correctAnswer: false,
  };
  const form = useForm<QuizQuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuid(),
      question: "Write your question here",
      answers: [initializedQuizAnswer],
    },
  });
  // initialize with values of fetched question if there is one
  // otherwise initialize with empty values
  const resetForm = (quizQuestion?: QuizQuestion) => {
    form.setValue("id", quizQuestion?.id || uuid());
    form.setValue("answers", quizQuestion?.answers || [initializedQuizAnswer]);
    form.setValue("question", quizQuestion?.question || "");
  };
  const {
    fetchedQuiz,
    isLoading: isLoadingGET,
  } = useGetQuizQuestion(isCreatePage ? null : quizQuestionId);
  useEffect(() => {
    if (fetchedQuiz) {
      resetForm(fetchedQuiz);
    }
  }, [fetchedQuiz]);
  // const {
  //   updateQuiz,
  // } = useUpdateQuiz(id!);
  const blockForm = form.formState.isSubmitting;
  // const {
  //   wereSearchResults,
  //   onPressBackButton,
  // } = useReturnToQueryResultsCallback(QUIZS_ROUTE);
  // const { isSubmitting } = form.formState;
  const {
    wereSearchResults,
    onPressBackButton,
  } = useReturnToQueryResultsCallback(`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/${quizSlug}`);
  const pageHeaderText = isCreatePage ? "Create new quiz question" : "Edit quiz question";
  const {
    createQuizQuestion,
  } = useCreateQuizQuestion();
  const {
    updateQuizQuestion,
  } = useUpdateQuizQuestion();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (fetchedQuiz) {
        await updateQuizQuestion(values);
        toast.success("Quiz updated");
      } else {
        await createQuizQuestion(values);
        createSuccessDialogTriggerRef.current?.click();
        // navigate(`/${QUIZZES_ROUTE}/${quiz.category.name}/${quiz.id}`, { replace: true });
        // resetForm(quiz);
        // toast.success("New quiz created");
      }
    } catch (error: any) {
      toast.error(error.response.data || "Something went wrong...");
    }
  };
  const answers = form.watch("answers");
  const addAnswer = () => {
    form.setValue("answers", [...answers, initializedQuizAnswer]);
  };
  const removeAnswer = (index: number) => {
    form.setValue("answers", [...answers.slice(0, index), ...answers.slice(index + 1)]);
  };
  const markCorrectAnswer = (quizAnswerId: string) => {
    const newAnswers = answers.map((ans) => {
      if (ans.id === quizAnswerId) {
        return {
          ...ans,
          correctAnswer: true,
        };
      }
      return {
        ...ans,
        correctAnswer: false,
      };
    });
    form.setValue("answers", newAnswers);
  };
  return (
    <Meta title={pageHeaderText}>
      <main>
        <PageHeader header={pageHeaderText} icon={<Wand2 />} />
        <ContentFrame mt>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                disabled={blockForm}
                variant="outline"
                className="justify-start mb-4 ps-0 font-bold"
                onClick={onPressBackButton}
              >
                <ChevronLeft />
                {wereSearchResults ? "Return to search results" : "Exit"}
              </Button>
            </div>
            {isLoadingGET ? (
              <div className="mt-6 mx-auto">
                <LoadingSquares />
              </div>
            ) : (
              <Form {...form}>
                <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="question"
                    key="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl">
                          Question
                        </FormLabel>
                        <FormControl>
                          <FormControl>
                            <TipTapEditor field={field} className="mt-2" />
                          </FormControl>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="answers"
                    key="answers"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-2xl">
                          Answers
                        </FormLabel>
                        <div className="flex flex-col">
                          {field.value?.map((f, i) => (
                            <div className="flex gap items-center mt-2" key={f.id}>
                              <span className="mr-2">
                                {i + 1}
                                &#46;
                              </span>
                              <FormControl>
                                <TipTapEditor field={field} i={i} />
                              </FormControl>
                              <div className="flex items-center gap-4 ml-6">
                                <Checkbox
                                  className="w-6 h-6"
                                  checked={answers[i].correctAnswer}
                                  onClick={() => markCorrectAnswer(answers[i].id)}
                                />
                                <Button
                                  className="text-red-500"
                                  variant="blank"
                                  size="icon"
                                  onClick={() => removeAnswer(i)}
                                  type="button"
                                  disabled={answers.length === 1}
                                >
                                  <Delete className="w-8 h-10" strokeWidth="0.8" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={addAnswer}
                  >
                    <Plus className="w-4 h-4 mr-0.5" />
                    Add answer
                  </Button>
                  <div className="flex self-end gap-2">
                    <ClearFormDialog resetForm={resetForm}>
                      <Button
                        className="mt-4"
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                    </ClearFormDialog>
                    <CreateSuccessDialog
                      resetForm={resetForm}
                    >
                      <Button
                        className="mt-4 hidden"
                        variant="outline"
                        type="button"
                        ref={createSuccessDialogTriggerRef}
                      />
                    </CreateSuccessDialog>
                    <Button
                      className="mt-4"
                      variant="outline"
                      type="submit"
                    >
                      <UploadCloud className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default CreateQuizQuestionPage;
