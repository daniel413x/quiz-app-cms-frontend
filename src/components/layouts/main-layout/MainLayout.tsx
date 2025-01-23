import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// fonts used are Roboto, Roboto Condensed, Ubuntu
interface MainLayoutProps {
  children: ReactNode;
  noContainer?: boolean;
}

function MainLayout({
  children,
  noContainer,
}: MainLayoutProps) {
  return (
    <div
      className="flex flex-col h-full w-full font-roboto"
      data-testid="main-layout"
    >
      <div className="div flex flex-col h-full md:flex-row">
        <Header />
        {noContainer ? children : (
          <div className="container mx-auto flex-1 py-10">
            {children}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
