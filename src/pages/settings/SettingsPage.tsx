import {
  FilePen,
  Pen,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDomain, useUpdateDomain } from "@/lib/api/DomainApi";
import {
  FormControl, FormField, FormItem, FormLabel,
  FormMessage, Form,
} from "@/components/ui/common/shadcn/form";
import LabelText from "@/components/ui/common/LabelText";
import { Input } from "@/components/ui/common/shadcn/input";
import { Button } from "@/components/ui/common/shadcn/button";
import { Checkbox } from "@/components/ui/common/shadcn/checkbox";
import { ChangeEvent, useEffect } from "react";
import { toast } from "sonner";
import { SETTINGS_ROUTE } from "@/lib/consts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string(),
  slug: z.string(),
  private: z.optional(z.boolean()),
});

export type DomainForm = UseFormReturn<z.infer<typeof formSchema>, any, undefined>;

export type DomainFormValues = z.infer<typeof formSchema>;

function SettingsPage() {
  const navigate = useNavigate();
  const {
    domain,
  } = useGetDomain();
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      private: false,
    },
  });
  const onChangeSlug = (e: ChangeEvent<HTMLInputElement>) => {
    let i = e.target.value.toLowerCase();
    i = i.replace(/[^\w-]|_/g, "").replace(/--+/, "-");
    form.setValue("slug", i);
  };
  useEffect(() => {
    if (domain) {
      form.setValue("name", domain.name);
      form.setValue("private", domain.private);
      form.setValue("slug", domain.slug);
    }
  }, [domain]);
  const { isSubmitting } = form.formState;
  const { updateDomain } = useUpdateDomain(domain?.id || "");
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateDomain(values);
      navigate(`/${form.watch("slug")}/${SETTINGS_ROUTE}`);
      toast.success("Your domain was updated successfully");
    } catch (error: any) {
      toast.error(error.response.data || "Something went wrong...");
    }
  };
  return (
    <Meta title="Settings">
      <main>
        <PageHeader header="Settings" icon={<Pen />} />
        <ContentFrame mt>
          <Form {...form}>
            <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                key="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <LabelText string="alphanumeric" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="My Quizzes"
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
                      <LabelText string="alphanumeric" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="my-quizzes"
                        {...field}
                        onChange={onChangeSlug}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="private"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0.5">
                      <FormLabel>
                        Private
                        <LabelText string="boolean" />
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="flex gap-1 mt-4" variant="outline" type="submit">
                  <FilePen className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Form>
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default SettingsPage;
