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
      className="flex flex-col min-h-screen w-full font-roboto"
      data-testid="main-layout"
    >
      <div
        className="fixed min-h-screen w-full bg-no-repeat bg-cover bg-center -z-10"
      />
      <div className="div flex flex-col min-h-screen md:flex-row">
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
