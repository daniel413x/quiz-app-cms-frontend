import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { errorCatch } from "../utils";
import { DOMAIN_ROUTE } from "../consts";
import { Domain } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useGetDomain = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const getDomainReq: () => Promise<Domain> = async () => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${DOMAIN_ROUTE}/by-auth0-id/${id}`, {
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
    "getDomain",
    getDomainReq,
    {
      enabled: isAuthenticated, // Only run the query if the user is authenticated
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

export const useUpdateDomain = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const updateDomainReq = async (formData: UpdateDomainReq) => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${DOMAIN_ROUTE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      if (await res.text() === "Invalid address") {
        throw new Error("Could not validate provided address, please try again");
      } else {
        throw new Error("Failed to update user");
      }
    }
  };
  const {
    mutateAsync: updateDomain,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateDomainReq);
  if (isSuccess) {
    toast.success("Domain profile updated!");
  }
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    updateDomain,
    isLoading,
    isSuccess,
  };
};
