import { ReactNode } from "react";
import { Helmet } from "react-helmet";

export interface MetaProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function createTitleString(string: string) { return `${string} | Warehouse Admins`; }

function Meta({
  title,
  description,
  children,
}: MetaProps) {
  return (
    <>
      <Helmet>
        <title>{createTitleString(title)}</title>
        {description ? (
          <>
            <meta name="description" content={description} />
            <meta name="og:title" content={createTitleString(title)} />
            <meta name="og:description" content={description} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Helmet>
      {children}
    </>
  );
}

Meta.defaultProps = {
  description: "",
};

export default Meta;
