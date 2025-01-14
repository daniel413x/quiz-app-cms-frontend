import Meta from "@/components/misc/Meta";
import {
  PanelBottom,
} from "lucide-react";
import PageHeader from "@/components/ui/common/PageHeader";

function DashboardPage() {
  return (
    <Meta title="Your Quiz CMS Dashboard">
      <main>
        <PageHeader header="Welcome, Admin!" icon={<PanelBottom />} className="mb-0" />
      </main>
    </Meta>
  );
}

export default DashboardPage;
