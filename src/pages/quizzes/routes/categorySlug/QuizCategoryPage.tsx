import {
  List,
  Plus,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { useGetQuizzes } from "@/lib/api/QuizApi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/common/shadcn/button";
import LoadingSquares from "@/components/ui/common/LoadingSquares";
import { QUIZZES_ROUTE } from "@/lib/consts";
import QuizCard from "./components/QuizCard";
import CreateQuizDialog from "./components/CreateQuizDialog";

function QuizCategoryPage() {
  const {
    categorySlug,
  } = useParams();
  const {
    data,
    isLoading: isLoadingGET,
  } = useGetQuizzes(categorySlug);
  return (
    <Meta title={`/${categorySlug}`}>
      <main>
        <PageHeader header={`/${QUIZZES_ROUTE}/${categorySlug}`} icon={<List />} />
        <ContentFrame mt>
          <div className="flex flex-col">
            <CreateQuizDialog>
              <Button
                variant="outline"
                className="flex items-center gap-1 py-6 px-8"
              >
                <Plus />
                Create Quiz
              </Button>
            </CreateQuizDialog>
            {isLoadingGET ? (
              <div className="mt-6 mx-auto">
                <LoadingSquares />
              </div>
            ) : (
              <ul>
                {data![0].map((q) => (
                  <li key={q.id}>
                    <QuizCard quiz={q} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default QuizCategoryPage;
