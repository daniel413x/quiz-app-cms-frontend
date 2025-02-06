import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { QuizFormValues } from "@/pages/quizzes/routes/categorySlug/components/CreateQuizDialog";
import { createFakeDelay, errorCatch } from "../utils";
import { QUIZ_API_ROUTE } from "../consts";
import { Quiz, QuizGETManyRes, QuizGETRes } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_QUIZZES = "getQuizzes";
const GET_QUIZ = "getQuiz";

export const useGetQuizzes = (categorySlug?: string | null) => {
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) - 1 || 0;
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${QUIZ_API_ROUTE}/${categorySlug}`,
    query: {
      page,
      sortBy,
      search,
    },
  }, { skipNull: true });
  const getQuizzesReq: () => Promise<QuizGETManyRes> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get categories");
    }
    const results = await createFakeDelay(res);
    return results[0].json();
  };
  const {
    data: fetchedQuizzes, isLoading, isError, error,
  } = useQuery([GET_QUIZZES, url], getQuizzesReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedQuizzes, isLoading, isError, error,
  };
};

// include categorySlug to search within a category
export const useGetQuiz = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    categorySlug,
    quizSlug,
  } = useParams();
  const url = `${API_BASE_URL}/${QUIZ_API_ROUTE}/${categorySlug}/${quizSlug}`;
  const getQuizzesReq: () => Promise<QuizGETRes> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get quiz");
    }
    return res.json();
  };
  const {
    data: fetchedQuiz, isLoading, isError, error,
  } = useQuery([url, GET_QUIZ], getQuizzesReq, {
    enabled: !!categorySlug || !!quizSlug,
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    fetchedQuiz, isLoading, isError, error,
  };
};

export const useCreateQuiz = (categorySlug: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const createQuizReq = async (values: QuizFormValues): Promise<Quiz> => {
    const accessToken = await getAccessTokenSilently();
    const form = {
      ...values,
      categorySlug,
    };
    const body = JSON.stringify({
      ...form,
    });
    // if the category is created and its id is set in the create category page,
    // then react-query should allow it to be fetched automatically
    const res = await fetch(`${API_BASE_URL}/${QUIZ_API_ROUTE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to create category");
    }
    const json = await res.json();
    return json;
  };
  const {
    mutateAsync: createQuiz, isLoading, isError, isSuccess,
  } = useMutation(
    createQuizReq,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUIZZES);
      },
    },
  );
  return {
    createQuiz, isLoading, isError, isSuccess,
  };
};

export const useUpdateQuiz = (id: string) => {
  const updateQuizReq = async (values: QuizFormValues): Promise<void> => {
    const form = {
      ...values,
    };
    const body = JSON.stringify({
      ...form,
    });
    const res = await fetch(`${API_BASE_URL}/${QUIZ_API_ROUTE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to update category");
    }
  };
  const {
    mutateAsync: updateQuiz, isLoading, isError, isSuccess,
  } = useMutation(
    updateQuizReq,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUIZZES);
      },
    },
  );
  return {
    updateQuiz, isLoading, isError, isSuccess,
  };
};

export const useDeleteQuiz = (id: string, returnTo?: string) => {
  const navigate = useNavigate();
  const url = `${API_BASE_URL}/${QUIZ_API_ROUTE}/${id}`;
  const deleteQuizReq: () => Promise<void> = async () => {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("failed to delete category");
    }
  };
  const {
    mutate: deleteQuiz, isLoading, isError, error,
  } = useMutation(deleteQuizReq, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_QUIZZES);
      toast.success("Quiz was deleted successfully");
      if (returnTo) {
        navigate(returnTo);
      }
    },
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    deleteQuiz, isLoading, isError, error,
  };
};
