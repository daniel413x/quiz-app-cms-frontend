import { Button } from "@/components/ui/common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/common/shadcn/dialog";
import { DialogCloseButton } from "@/components/ui/common/shadcn/dialog-close-button";
import {
  Form,
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { useCreateQuizCategory, useUpdateQuizCategory } from "@/lib/api/QuizCategoryApi";
import { QuizCategory } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetIcon } from "@radix-ui/react-icons";
import {
  UploadCloud,
} from "lucide-react";
import { ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
});

export type QuizCategoryFormValues = z.infer<typeof formSchema>;

interface CreateQuizCategoryDialogProps {
  children: ReactNode;
  quizCategory?: QuizCategory;
}

function CreateQuizCategoryDialog({
  children,
  quizCategory,
}: CreateQuizCategoryDialogProps) {
  const form = useForm<QuizCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: quizCategory ? quizCategory.name : "",
    },
  });
  const {
    createQuizCategory,
  } = useCreateQuizCategory();
  const {
    updateQuizCategory,
  } = useUpdateQuizCategory(quizCategory?.id);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeModal = () => {
    closeButtonRef.current?.click();
  };
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (quizCategory) {
        await updateQuizCategory(values);
        toast.success("Quiz updated");
        closeModal();
      } else {
        await createQuizCategory(values);
        toast.success("Quiz created");
        closeModal();
        // navigate(`/${QUIZ_ROUTE}/${quiz.category.name}/${quiz.id}`, { replace: true });
        // resetForm(quiz);
        // toast.success("New quiz created");
      }
    } catch (error: any) {
      toast.error(error.response.data || "Something went wrong...");
    }
  };
  const title = quizCategory ? "Edit quiz category" : "Create quiz category";
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className="border-stone-700"
        data-testid="create-modal"
      >
        <DialogCloseButton ref={closeButtonRef} />
        <DialogHeader>
          <DialogTitle className="text-stone-700 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              key="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="Name">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Mathematics"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-2 gap-1 items-center">
              <Button
                className="bg-stone-700 hover:bg-stone-600"
                type="submit"
              >
                <UploadCloud className="w-5 h-5 mr-1" />
                Save
              </Button>
              <Button
                onClick={closeModal}
                type="button"
                className="bg-stone-700 hover:bg-stone-600"
              >
                <ResetIcon
                  className="w-5 h-5 mr-1"
                  type="button"
                />
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateQuizCategoryDialog;
