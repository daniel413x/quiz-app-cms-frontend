import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "@/lib/api/UserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, USER_CREATION_FAILED_ROUTE } from "@/lib/consts";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const {
    user, loginWithRedirect, logout, error,
  } = useAuth0();
  const { createUser } = useCreateUser();
  const hasCreatedUser = useRef(false);
  useEffect(() => {
    (async () => {
      if (!user) {
        loginWithRedirect();
      }
      if (error) {
        // must add to allowed logout urls
        logout({ logoutParams: { returnTo: `/${USER_CREATION_FAILED_ROUTE}` } });
      }
      // the Auth0 user is created, but the application-side User and Domain
      // objects are not. create them
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        await createUser({ auth0Id: user.sub, email: user.email });
        hasCreatedUser.current = true;
      }
      navigate(`/${DASHBOARD_ROUTE}`);
    })();
    // important for cypress
  }, [hasCreatedUser, error, user]);
  useEffect(() => {

  }, []);
  return (
    <>Loading...</>
  );
}

export default AuthCallbackPage;
