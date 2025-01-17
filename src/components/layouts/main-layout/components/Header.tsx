import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { DASHBOARD_ROUTE } from "@/lib/consts";
import useIsAuthenticated from "@/lib/hooks/useIsAuthenticated";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import UsernameMenu from "./UsernameMenu";

function Header() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <header
      className="border-b-gray-500 py-6 bg-white md:[height:unset] h-[86px] md:border-r-2 md:border-b-0 border-b-2 border-black"
    >
      <div className="container flex flex-row md:flex-col mx-auto justify-between  h-full">
        <div className="flex flex-col">
          <Link
            className="text-3xl font-bold tracking-light text-gray-500 "
            to={isAuthenticated ? `/${DASHBOARD_ROUTE}` : "/"}
          >
            <img
              src={logo}
              alt="Company logo"
            />
          </Link>
          <nav className="hidden md:flex mt-8 overflow-x-auto max-w-100 ">
            <MainNav />
          </nav>
        </div>
        {!isAuthenticated ? null : (
          <>
            <div className="md:hidden" data-testid="mobile-menu">
              <MobileNav />
            </div>
            <div className="hidden md:block space-x-2 items-center" data-testid="non-mobile-menu">
              <UsernameMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
