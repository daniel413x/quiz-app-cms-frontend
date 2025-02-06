import { Button } from "@/components/ui/common/shadcn/button";
import { User } from "lucide-react";
import Meta from "@/components/misc/Meta";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { AUTH_CALLBACK_ROUTE } from "@/lib/consts";
import { useEffect } from "react";

function RootPage() {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const onClick = () => {
    if (isAuthenticated) {
      navigate(`/${AUTH_CALLBACK_ROUTE}`);
    } else {
      loginWithPopup();
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${AUTH_CALLBACK_ROUTE}`);
    }
  }, [isAuthenticated]);
  return (
    <Meta title="Portal">
      <main>
        <Button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-stone-600 border-2 px-16 py-5 h-max font-semibold hover:text-stone-400 hover:bg-white text-black rounded-none"
          onClick={onClick}
          data-testid="login-button"
          id="login-button"
        >
          <User className="text-violet-500 mr-2" />
          <span className="text-lg">
            Login
          </span>
        </Button>
      </main>
    </Meta>
  );
}

export default RootPage;
