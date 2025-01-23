import {
  Pen,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";

function SettingsPage() {
  return (
    <Meta title="Settings">
      <main>
        <PageHeader header="Settings" icon={<Pen />} />
        <ContentFrame mt>
          qq
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default SettingsPage;
