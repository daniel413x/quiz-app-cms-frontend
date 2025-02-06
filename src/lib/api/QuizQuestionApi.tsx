import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { QuizQuestionFormValues } from "@/pages/quizzes/routes/categorySlug/quizName/create/CreateQuizQuestionPage";
import { errorCatch } from "../utils";
import { QUIZ_QUESTION_API_ROUTE } from "../consts";
import { QuizQuestion, QuizQuestionGETManyRes } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_QUIZ_QUESTIONS = "getQuizQuestions";
const GET_QUIZ_QUESTION = "getQuizQuestion";

export const useGetQuizQuestions = () => {
  const {
    quizSlug,
  } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) - 1 || 0;
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/get-by-quiz-slug/${quizSlug}`,
    query: {
      page,
      sortBy,
      search,
    },
  }, { skipNull: true });
  const getQuizQuestionsReq: () => Promise<QuizQuestionGETManyRes> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get quizzes");
    }
    const fakeDelay = new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const results = await Promise.all([res, fakeDelay]);
    return results[0].json();
  };
  const {
    data: fetchedQuizQuestions, isLoading, isError, error,
  } = useQuery([GET_QUIZ_QUESTIONS, url], getQuizQuestionsReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedQuizQuestions, isLoading, isError, error,
  };
};

export const useGetQuizQuestion = (id?: string | null) => {
  const { getAccessTokenSilently } = useAuth0();
  const url = `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`;
  const getQuizQuestionsReq: () => Promise<QuizQuestion> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to get quiz with id ${id}`);
    }
    return res.json();
  };
  const {
    data: fetchedQuiz, isLoading, isError, error,
  } = useQuery([url, GET_QUIZ_QUESTION], getQuizQuestionsReq, {
    enabled: !!id,
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    fetchedQuiz, isLoading, isError, error,
  };
};

export const useCreateQuizQuestion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    quizSlug,
  } = useParams();
  const createQuizQuestionReq = async (values: QuizQuestionFormValues): Promise<QuizQuestion> => {
    const accessToken = await getAccessTokenSilently();
    const form = {
      ...values,
      quizSlug,
    };
    const body = JSON.stringify({
      ...form,
    });
    // if the quiz is created and its id is set in the create quiz page,
    // then react-query should allow it to be fetched automatically
    const res = await fetch(`${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to create quiz");
    }
    const json = await res.json();
    return json;
  };
  const {
    mutateAsync: createQuizQuestion, isLoading, isError, isSuccess,
  } = useMutation(createQuizQuestionReq);
  return {
    createQuizQuestion, isLoading, isError, isSuccess,
  };
};

export const useUpdateQuizQuestion = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    quizQuestionId,
    quizSlug,
  } = useParams();
  const updateQuizReq = async (values: QuizQuestionFormValues): Promise<void> => {
    const accessToken = await getAccessTokenSilently();
    const form = {
      ...values,
      quizSlug,
    };
    const body = JSON.stringify({
      ...form,
    });
    const res = await fetch(`${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${quizQuestionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to update quiz");
    }
  };
  const {
    mutateAsync: updateQuizQuestion, isLoading, isError, isSuccess,
  } = useMutation(updateQuizReq);
  return {
    updateQuizQuestion, isLoading, isError, isSuccess,
  };
};

export const useDeleteQuizQuestion = (id: string, returnTo?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const url = `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`;
  const deleteQuizQuestionReq: () => Promise<void> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("failed to delete quiz question");
    }
  };
  const {
    mutate: deleteQuizQuestion, isLoading, isError, error,
  } = useMutation(deleteQuizQuestionReq, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_QUIZ_QUESTIONS);
      toast.success("Quiz question was deleted successfully");
      if (returnTo) {
        navigate(returnTo);
      }
    },
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    deleteQuizQuestion, isLoading, isError, error,
  };
};
