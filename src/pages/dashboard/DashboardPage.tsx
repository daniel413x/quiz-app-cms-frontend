import Meta from "@/components/misc/Meta";
import {
  PanelBottom,
} from "lucide-react";
import PageHeader from "@/components/ui/common/PageHeader";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function DashboardPage() {
  const { isLoading, isAuthenticated } = useAuth0();
  useEffect(() => {
    console.log(isLoading, isAuthenticated);
  }, [isLoading, isAuthenticated]);
  return (
    <Meta title="Your Quiz CMS Dashboard">
      <main>
        <PageHeader header="Welcome, Admin!" icon={<PanelBottom />} className="mb-0" />
      </main>
    </Meta>
  );
}

export default DashboardPage;
