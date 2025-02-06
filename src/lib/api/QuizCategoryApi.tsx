import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useSearchParams } from "react-router-dom";
import { QuizCategoryFormValues } from "@/pages/quizzes/components/CreateQuizCategoryDialog";
import { useAuth0 } from "@auth0/auth0-react";
import { errorCatch } from "../utils";
import { QUIZ_CATEGORY_API_ROUTE } from "../consts";
import { QuizCategory, QuizCategoryGETManyRes } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_QUIZ_CATEGORIES = "getQuizCategories";
// const GET_QUIZ_CATEGORY = "getQuizCategory";

export const useGetQuizCategories = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) - 1 || 0;
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const url = qs.stringifyUrl({
    url: `${API_BASE_URL}/${QUIZ_CATEGORY_API_ROUTE}`,
    query: {
      page,
      sortBy,
      search,
    },
  }, { skipNull: true });
  const getQuizCategoriesReq: () => Promise<QuizCategoryGETManyRes> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get categories");
    }
    const fakeDelay = new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const results = await Promise.all([res, fakeDelay]);
    return results[0].json();
  };
  const {
    data: fetchedQuizCategories, isLoading, isError, error,
  } = useQuery([GET_QUIZ_CATEGORIES, url], getQuizCategoriesReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    data: fetchedQuizCategories, isLoading, isError, error,
  };
};

export const useCreateQuizCategory = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createQuizCategoryReq = async (values: QuizCategoryFormValues): Promise<QuizCategory> => {
    const accessToken = await getAccessTokenSilently();
    const form = {
      ...values,
    };
    const body = JSON.stringify({
      ...form,
    });
    // if the category is created and its id is set in the create category page,
    // then react-query should allow it to be fetched automatically
    const res = await fetch(`${API_BASE_URL}/${QUIZ_CATEGORY_API_ROUTE}`, {
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
    mutateAsync: createQuizCategory, isLoading, isError, isSuccess,
  } = useMutation(
    createQuizCategoryReq,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUIZ_CATEGORIES);
      },
    },
  );
  return {
    createQuizCategory, isLoading, isError, isSuccess,
  };
};

export const useUpdateQuizCategory = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const updateQuizCategoryReq = async (values: QuizCategoryFormValues): Promise<void> => {
    const accessToken = await getAccessTokenSilently();
    const form = {
      ...values,
    };
    const body = JSON.stringify({
      ...form,
    });
    const res = await fetch(`${API_BASE_URL}/${QUIZ_CATEGORY_API_ROUTE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
    if (!res.ok) {
      throw new Error("failed to update category");
    }
  };
  const {
    mutateAsync: updateQuizCategory, isLoading, isError, isSuccess,
  } = useMutation(
    updateQuizCategoryReq,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_QUIZ_CATEGORIES);
      },
    },
  );
  return {
    updateQuizCategory, isLoading, isError, isSuccess,
  };
};

export const useDeleteQuizCategory = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const url = `${API_BASE_URL}/${QUIZ_CATEGORY_API_ROUTE}/${id}`;
  const deleteQuizCategoryReq: () => Promise<void> = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("failed to delete quiz category");
    }
  };
  const {
    mutate: deleteQuizCategory, isLoading, isError, error,
  } = useMutation(deleteQuizCategoryReq, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_QUIZ_CATEGORIES);
      toast.success("Quiz category was deleted successfully");
    },
  });
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    deleteQuizCategory, isLoading, isError, error,
  };
};
