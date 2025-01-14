import {
  List,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { useGetQuizzes } from "@/lib/api/QuizApi";
import { useParams } from "react-router-dom";
import QuizCard from "./components/QuizCard";

function QuizCategoryPage() {
  const {
    categoryName,
  } = useParams();
  const {
    data,
    isLoading: isLoadingGET,
  } = useGetQuizzes(categoryName);
  console.log(data);
  return (
    <Meta title="Quizzes">
      <main>
        <PageHeader header="Quizzes" icon={<List />} />
        <ContentFrame mt>
          Create Category
          <ul className="">
            {isLoadingGET ? "LOADING" : data![0].map((q) => (
              <li key={q.id}>
                <QuizCard quiz={q} />
              </li>
            ))}
          </ul>

        </ContentFrame>
      </main>
    </Meta>
  );
}

export default QuizCategoryPage;
