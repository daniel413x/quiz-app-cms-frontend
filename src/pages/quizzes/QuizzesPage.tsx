import {
  List,
  Plus,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { useGetQuizCategories } from "@/lib/api/QuizCategoryApi";
import { Button } from "@/components/ui/common/shadcn/button";
import QuizCategoryCard from "./components/QuizCategoryCard";
import CreateQuizCategoryDialog from "./components/CreateQuizCategoryDialog";

function QuizzesPage() {
  const {
    data,
    isLoading: isLoadingGET,
  } = useGetQuizCategories();
  return (
    <Meta title="Quiz Categories">
      <main>
        <PageHeader header="Quiz Categories" icon={<List />} />
        <ContentFrame mt>
          <div className="flex flex-col">
            <CreateQuizCategoryDialog>
              <Button
                variant="outline"
                className="flex items-center gap-1 py-6 px-8"
              >
                <Plus />
                Create Quiz Category
              </Button>
            </CreateQuizCategoryDialog>
            <ul className="">
              {isLoadingGET ? "LOADING" : data![0].map((qC) => (
                <li key={qC.id}>
                  <QuizCategoryCard quizCategory={qC} />
                </li>
              ))}
            </ul>
          </div>

        </ContentFrame>
      </main>
    </Meta>
  );
}

export default QuizzesPage;
