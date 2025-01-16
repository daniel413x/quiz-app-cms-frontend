import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { QuizCategoryFormValues } from "@/pages/categories/routes/:categoryName/create/CreateQuizCategoryPage";
import { QuizCategoryFormValues } from "@/pages/quizzes/components/CreateQuizCategoryDialog";
import { errorCatch } from "../utils";
import { QUIZ_CATEGORY_API_ROUTE } from "../consts";
import { QuizCategory, QuizCategoryGETManyRes } from "../types";
import queryClient from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_QUIZ_CATEGORIES = "getQuizCategories";
// const GET_QUIZ_CATEGORY = "getQuizCategory";

export const useGetQuizCategories = () => {
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
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to get categories");
    }
    return res.json();
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

// export const useGetQuizCategory = (id?: string | null) => {
//   const url = `${API_BASE_URL}/${QUIZ_QUESTION_API_ROUTE}/${id}`;
//   const getQuizCategoriesReq: () => Promise<QuizCategory> = async () => {
//     const res = await fetch(url, {
//       method: "GET",
//     });
//     if (!res.ok) {
//       throw new Error(`Failed to get category with id ${id}`);
//     }
//     return res.json();
//   };
//   const {
//     data: fetchedQuiz, isLoading, isError, error,
//   } = useQuery([url, GET_QUIZ_CATEGORY], getQuizCategoriesReq, {
//     enabled: !!id,
//   });
//   if (error) {
//     toast.error(errorCatch(error));
//   }
//   return {
//     fetchedQuiz, isLoading, isError, error,
//   };
// };

export const useCreateQuizCategory = () => {
  const createQuizCategoryReq = async (values: QuizCategoryFormValues): Promise<QuizCategory> => {
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
  const updateQuizCategoryReq = async (values: QuizCategoryFormValues): Promise<void> => {
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
  const url = `${API_BASE_URL}/${QUIZ_CATEGORY_API_ROUTE}/${id}`;
  const deleteQuizCategoryReq: () => Promise<void> = async () => {
    const res = await fetch(url, {
      method: "DELETE",
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
