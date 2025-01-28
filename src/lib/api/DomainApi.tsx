import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { errorCatch } from "../utils";
import { DOMAIN_ROUTE } from "../consts";
import { Domain } from "../types";
import queryClient from "./queryClient";
import { useGetUser } from "./UserApi";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const GET_DOMAIN = "getDomain";

export const useGetDomain = () => {
  // !!user must be added to enabled: for this composite hook to work
  const {
    user,
  } = useGetUser();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const getDomainReq: () => Promise<Domain> = async () => {
    if (!user) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${DOMAIN_ROUTE}/${user.domain.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("failed to get user");
    }
    return res.json();
  };
  const { data: fetchedDomain, isLoading, error } = useQuery(
    [GET_DOMAIN],
    getDomainReq,
    {
      enabled: isAuthenticated && !!user, // Only run the query if the user is authenticated
    },
  );
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    domain: fetchedDomain, isLoading, error,
  };
};

type CreateDomainReq = {
  userId: string;
}

export const useCreateDomain = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createDomainReq = async (form: CreateDomainReq) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${DOMAIN_ROUTE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      throw new Error("failed to create user");
    }
  };
  const {
    mutateAsync: createDomain, isLoading, isError, isSuccess,
  } = useMutation(createDomainReq);
  return {
    createDomain, isLoading, isError, isSuccess,
  };
};

type UpdateDomainReq = Pick<Domain, "name">;

export const useUpdateDomain = (id: string) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const updateDomainReq = async (formData: UpdateDomainReq) => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${DOMAIN_ROUTE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Failed to update domain");
    }
  };
  const {
    mutateAsync: updateDomain,
    isLoading,
    isSuccess,
  } = useMutation(updateDomainReq, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_DOMAIN);
    },
  });
  return {
    updateDomain,
    isLoading,
    isSuccess,
  };
};
