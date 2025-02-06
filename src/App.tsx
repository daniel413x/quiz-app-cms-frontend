import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import {
  QUIZZES_ROUTE,
  DASHBOARD_ROUTE,
  CREATE_QUIZ_CATEGORY_ROUTE,
  EDIT_QUIZ_CATEGORY_ROUTE,
  SETTINGS_ROUTE,
  AUTH_CALLBACK_ROUTE,
  DOMAIN_ERROR_ROUTE,
  DOMAIN_NOT_FOUND_ROUTE,
  USER_CREATION_FAILED_ROUTE,
} from "./lib/consts";
import RootPage from "./pages/root/RootPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import QuizzesPage from "./pages/quizzes/QuizzesPage";
import PreviousHistoryItemProvider from "./components/providers/PreviousHistoryItemProvider";
import "katex/dist/katex.min.css";
import QuizCategoryPage from "./pages/quizzes/routes/categorySlug/QuizCategoryPage";
import QuizPage from "./pages/quizzes/routes/categorySlug/quizName/QuizPage";
import CreateQuizQuestionPage from "./pages/quizzes/routes/categorySlug/quizName/create/CreateQuizQuestionPage";
import SettingsPage from "./pages/settings/SettingsPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import Auth0ProviderWithNavigate from "./components/providers/Auth0ProviderWithNavigate";
import DomainRoute from "./components/misc/DomainRoute";
import DomainErrorPage from "./pages/domain-error-page/DomainErrorPage";
import DomainNotFoundPage from "./pages/domain-not-found-page/DomainNotFoundPage";
import UserCreationFailedPage from "./pages/user-creation-failed-page/UserCreationFailedPage";

const domainSlug = ":domainSlug";
const categorySlug = ":categorySlug";
const quizSlug = ":quizSlug";

function App() {
  return (
    <Router>
      <PreviousHistoryItemProvider>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route
              path="/"
              element={(
                <MainLayout>
                  <RootPage />
                </MainLayout>
            )}
            />
            <Route
              path={`/${AUTH_CALLBACK_ROUTE}`}
              element={(
                <MainLayout>
                  <AuthCallbackPage />
                </MainLayout>
            )}
            />
            <Route
              path={`/${DOMAIN_ERROR_ROUTE}`}
              element={(
                <DomainErrorPage />
            )}
            />
            <Route
              path={`/${USER_CREATION_FAILED_ROUTE}`}
              element={(
                <UserCreationFailedPage />
            )}
            />
            <Route
              path={`/${DOMAIN_NOT_FOUND_ROUTE}`}
              element={(
                <DomainNotFoundPage />
            )}
            />
            <Route element={<DomainRoute />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${DASHBOARD_ROUTE}`}
                  element={(
                    <MainLayout>
                      <DashboardPage />
                    </MainLayout>
          )}
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}`}
                  element={(
                    <MainLayout>
                      <QuizzesPage />
                    </MainLayout>
          )}
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/:quizSlug`}
                  element={(
                    <MainLayout>
                      <QuizPage />
                    </MainLayout>
          )}
                />
              </Route>
              {/* fetch quizzes by categorySlug */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}`}
                  element={(
                    <MainLayout>
                      <QuizCategoryPage />
                    </MainLayout>
          )}
                />
              </Route>
              {/* create "Programming" */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}/${CREATE_QUIZ_CATEGORY_ROUTE}`}
                  element={(
                    <MainLayout>
                      <QuizzesPage />
                    </MainLayout>
          )}
                />
              </Route>
              {/* edit "Programming" */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}/${EDIT_QUIZ_CATEGORY_ROUTE}`}
                  element={(
                    <MainLayout>
                      <QuizzesPage />
                    </MainLayout>
          )}
                />
              </Route>
              {/* quizQuestionId can be CREATE_QUIZ_QUESTION_ROUTE, in which case the route is for creating a new object, otherwise it will be for editing one */}
              {/* create "Programming -> JavaScript" */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${QUIZZES_ROUTE}/${categorySlug}/${quizSlug}/:quizQuestionId`}
                  element={(
                    <MainLayout>
                      <CreateQuizQuestionPage />
                    </MainLayout>
          )}
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={`/${domainSlug}/${SETTINGS_ROUTE}`}
                  element={(
                    <MainLayout>
                      <SettingsPage />
                    </MainLayout>
          )}
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={(
                <Navigate
                  to="/"
                />
            )}
            />
          </Routes>
        </Auth0ProviderWithNavigate>
      </PreviousHistoryItemProvider>
    </Router>
  );
}

export default App;
