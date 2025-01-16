import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import {
  QUIZ_ROUTE,
  DASHBOARD_ROUTE,
  CREATE_QUIZ_CATEGORY_ROUTE,
  EDIT_QUIZ_CATEGORY_ROUTE,
  EDIT_QUIZ_QUESTION_ROUTE,
} from "./lib/consts";
import RootPage from "./pages/root/RootPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import QuizzesPage from "./pages/quizzes/QuizzesPage";
import PreviousHistoryItemProvider from "./components/providers/PreviousHistoryItemProvider";
import "katex/dist/katex.min.css";
import QuizCategoryPage from "./pages/quizzes/routes/categoryName/QuizCategoryPage";
import QuizPage from "./pages/quizzes/routes/categoryName/quizName/QuizPage";
import CreateQuizQuestionPage from "./pages/quizzes/routes/categoryName/quizName/create/CreateQuizQuestionPage";

function App() {
  return (
    <Router>
      <PreviousHistoryItemProvider>
        <Routes>
          <Route
            path="/"
            element={(
              <MainLayout noContainer>
                <RootPage />
              </MainLayout>
            )}
          />
          <Route
            path={`/${QUIZ_ROUTE}`}
            element={(
              <MainLayout>
                <QuizzesPage />
              </MainLayout>
          )}
          />
          <Route
            path={`/${QUIZ_ROUTE}/:categoryName/:quizName`}
            element={(
              <MainLayout>
                <QuizPage />
              </MainLayout>
          )}
          />
          {/* fetch quizzes by categoryName */}
          <Route
            path={`/${QUIZ_ROUTE}/:categoryName`}
            element={(
              <MainLayout>
                <QuizCategoryPage />
              </MainLayout>
          )}
          />
          {/* create "Programming" */}
          <Route
            path={`/${QUIZ_ROUTE}/${CREATE_QUIZ_CATEGORY_ROUTE}`}
            element={(
              <MainLayout>
                <QuizzesPage />
              </MainLayout>
          )}
          />
          {/* edit "Programming" */}
          <Route
            path={`/${QUIZ_ROUTE}/${EDIT_QUIZ_CATEGORY_ROUTE}`}
            element={(
              <MainLayout>
                <QuizzesPage />
              </MainLayout>
          )}
          />
          {/* create "Programming -> JavaScript" */}
          <Route
            path={`/${QUIZ_ROUTE}/:categoryName/:quizName/:quizQuestionId`}
            element={(
              <MainLayout>
                <CreateQuizQuestionPage />
              </MainLayout>
          )}
          />
          <Route
            path={`/${QUIZ_ROUTE}/:categoryName/:quizQuestionId/${EDIT_QUIZ_QUESTION_ROUTE}`}
            element={(
              <MainLayout>
                <QuizzesPage />
              </MainLayout>
          )}
          />
          <Route
            path={`/${DASHBOARD_ROUTE}`}
            element={(
              <MainLayout>
                <DashboardPage />
              </MainLayout>
          )}
          />
          <Route
            path="*"
            element={(
              <Navigate
                to="/"
              />
            )}
          />
        </Routes>
      </PreviousHistoryItemProvider>
    </Router>
  );
}

export default App;
