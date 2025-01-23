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
import { useCreateQuiz, useUpdateQuiz } from "@/lib/api/QuizApi";
import { Quiz } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetIcon } from "@radix-ui/react-icons";
import {
  UploadCloud,
} from "lucide-react";
import { ChangeEvent, ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  slug: z.string().regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.",
  ),
});

export type QuizFormValues = z.infer<typeof formSchema>;

interface CreateQuizDialogProps {
  children: ReactNode;
  quiz?: Quiz;
}

function CreateQuizDialog({
  children,
  quiz,
}: CreateQuizDialogProps) {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: quiz ? quiz.name : "",
      slug: quiz ? quiz.slug : "",
    },
  });
  const {
    categoryName,
  } = useParams();
  const {
    createQuiz,
  } = useCreateQuiz(categoryName!);
  const onChangeSlug = (e: ChangeEvent<HTMLInputElement>) => {
    let i = e.target.value.toLowerCase();
    i = i.replace(/[^\w-]|_/g, "").replace(/--+/, "-");
    form.setValue("slug", i);
  };
  const {
    updateQuiz,
  } = useUpdateQuiz(quiz?.id || "");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeModal = () => {
    closeButtonRef.current?.click();
  };
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (quiz) {
        await updateQuiz(values);
        toast.success("Quiz updated");
        closeModal();
      } else {
        await createQuiz(values);
        toast.success("Quiz created");
        closeModal();
      }
    } catch (error: any) {
      toast.error(error.response.data || "Something went wrong...");
    }
  };
  const title = quiz ? "Edit quiz" : "Create quiz";
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
                      placeholder="JavaScript Functions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              key="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="javascript-functions"
                      {...field}
                      onChange={onChangeSlug}
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

export default CreateQuizDialog;
