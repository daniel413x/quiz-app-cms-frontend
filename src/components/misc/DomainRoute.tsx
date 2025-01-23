import { useGetDomain } from "@/lib/api/DomainApi";
import { useGetUser } from "@/lib/api/UserApi";
import { DOMAIN_ERROR_ROUTE } from "@/lib/consts";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function DomainRoute() {
  const {
    domainSlug,
  } = useParams();
  const navigate = useNavigate();
  const {
    isAuthenticated, isLoading, loginWithRedirect,
  } = useAuth0();
  const { error: domainError, domain } = useGetDomain();
  const { error: userError, user } = useGetUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !user) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, user]);
  useEffect(() => {
    if (domainError || userError) {
      navigate(`/${DOMAIN_ERROR_ROUTE}`);
    }
  }, [domainError, userError]);
  const mismatchedSlug = domainSlug !== user?.domain?.slug;
  return mismatchedSlug || !domain ? "Fetching domain..." : <Outlet />;
}

export default DomainRoute;
