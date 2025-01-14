import {
  ComputerIcon,
  Notebook,
  NotebookPen,
  Pen,
  Square,
} from "lucide-react";
import Meta from "@/components/misc/Meta";
import PageHeader from "@/components/ui/common/PageHeader";
import ContentFrame from "@/components/ui/common/ContentFrame";

function CreateQuizPage() {
  return (
    <Meta title="pageHeaderText">
      <main>
        <PageHeader header="Create new quiz question" icon={<Pen />} />
        <ContentFrame mt>
          qq
        </ContentFrame>
      </main>
    </Meta>
  );
}

export default CreateQuizPage;
