import {
  List,
  Plus,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";
import { useGetQuiz } from "@/lib/api/QuizApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/common/shadcn/button";
import { CREATE_QUIZ_QUESTION_ROUTE, QUIZ_ROUTE } from "@/lib/consts";
import QuizQuestionCard from "./components/QuizQuestionCard";

function QuizPage() {
  const {
    quizName,
    categoryName,
  } = useParams();
  const {
    fetchedQuiz,
    isLoading: isLoadingGET,
  } = useGetQuiz(quizName!, categoryName!);
  const navigate = useNavigate();
  const toCreatePage = () => navigate(`/${QUIZ_ROUTE}/${categoryName}/${quizName}/${CREATE_QUIZ_QUESTION_ROUTE}`);
  return (
    <Meta title="Quiz page">
      <main>
        <PageHeader header="Quiz page" icon={<List />} />
        <ContentFrame mt>
          <div className="flex flex-col">
            <Button
              onClick={toCreatePage}
              variant="outline"
              className="flex items-center gap-1 py-6 px-8"
            >
              <Plus />
              Create Quiz Question
            </Button>
            <ul>
              {isLoadingGET ? "LOADING" : fetchedQuiz![0].questions.map((q) => (
                <li key={q.id}>
                  <QuizQuestionCard quizQuestion={q} />
                </li>
              ))}
            </ul>
          </div>
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default QuizPage;
