import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "@/lib/api/UserApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, USER_CREATION_FAILED_ROUTE } from "@/lib/consts";
import LoadingSquares from "../../components/ui/common/LoadingSquares";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const {
    user, loginWithRedirect, logout, error,
  } = useAuth0();
  const { createUser } = useCreateUser();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    (async () => {
      // important for cypress
      if (!user) {
        loginWithRedirect();
      }
      if (error) {
        // must add to allowed logout urls
        logout({ logoutParams: { returnTo: `/${USER_CREATION_FAILED_ROUTE}` } });
      }
      // create and return User and Domain via SQLAlchemy on the backend
      // if they do not already exist.
      // otherwise just return the existing objects
      if (user?.sub && user?.email) {
        const { slug } = (await createUser({ auth0Id: user.sub, email: user.email })).domain;
        const ms = Math.floor(Math.random() * (450 - 100) + 100);
        timeoutId = setTimeout(() => navigate(`/${slug}/${DASHBOARD_ROUTE}`), ms);
      }
    })();
    return () => clearTimeout(timeoutId);
  }, [error, user]);
  return (
    <main className="w-full h-full flex items-center justify-center"><LoadingSquares /></main>
  );
}

export default AuthCallbackPage;
