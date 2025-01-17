import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuizQuestionFormValues } from "@/pages/quizzes/routes/:categoryName/create/CreateQuizQuestionPage";
import { errorCatch } from "../utils";
import { QUIZ_QUESTION_API_ROUTE } from "../consts";
import { QuizQuestion, QuizQuestionGETManyRes } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_QUIZ_QUESTIONS = "getQuizQuestions";
const GET_CAR = "getQuizQuestion";

export const useGetQuizQuestions = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) - 1 || 0;
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}`,
    query: {
      page,
      sortBy,
      search,
    },
  }, { skipNull: true });
  const getQuizQuestionsReq: () => Promise<QuizQuestionGETManyRes> = async () => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to get quizzes");
    }
    return res.json();
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
  const url = `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`;
  const getQuizQuestionsReq: () => Promise<QuizQuestion> = async () => {
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to get quiz with id ${id}`);
    }
    return res.json();
  };
  const {
    data: fetchedQuiz, isLoading, isError, error,
  } = useQuery([url, GET_CAR], getQuizQuestionsReq, {
    enabled: !!id,
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    fetchedQuiz, isLoading, isError, error,
  };
};

export const useCreateQuizQuestion = (quizName: string) => {
  const createQuizQuestionReq = async (values: QuizQuestionFormValues): Promise<QuizQuestion> => {
    const form = {
      ...values,
      quizName,
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

export const useUpdateQuizQuestion = (id: string) => {
  const updateQuizReq = async (values: QuizQuestionFormValues): Promise<void> => {
    const form = {
      ...values,
    };
    const body = JSON.stringify({
      ...form,
    });
    const res = await fetch(`${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
  const navigate = useNavigate();
  const url = `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`;
  const deleteQuizQuestionReq: () => Promise<void> = async () => {
    const res = await fetch(url, {
      method: "DELETE",
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
