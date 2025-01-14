import { Button } from "@/components/ui/common/shadcn/button";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Meta from "@/components/misc/Meta";
import { DASHBOARD_ROUTE } from "@/lib/consts";

function RootPage() {
  const navigate = useNavigate();
  return (
    <Meta title="Portal">
      <main
        className="flex flex-1 relative"
      >
        <Button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-stone-600 border-2 px-16 py-5 h-max font-semibold hover:text-stone-400 hover:bg-white text-black rounded-none"
          onClick={() => navigate(`/${DASHBOARD_ROUTE}`)}
          data-testid="login-button"
          id="login-button"
        >
          <KeyRound className="text-yellow-400 mr-2" />
          <span className="text-lg">
            Login
          </span>
        </Button>
      </main>
    </Meta>
  );
}

export default RootPage;
