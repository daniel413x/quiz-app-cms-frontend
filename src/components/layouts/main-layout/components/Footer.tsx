import FlaskLogo from "@/assets/icons/flask-logo.svg";
import SQLAlchemyLogo from "@/assets/icons/sqlalchemy-logo.svg";
import ViteLogo from "@/assets/icons/vite-logo.svg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white px-8 py-6 border-t border-black">
      <div className="flex items-center justify-between [max-width:1000px] m-auto">
        <div className="flex flex-col items-center gap-2">
          <span className="uppercase text-xs">
            running on
          </span>
          <div className="flex gap-2">
            <Link
              to="/"
            >
              <img src={ViteLogo} alt="" />
            </Link>
            <Link
              to="/"
            >
              <img src={SQLAlchemyLogo} alt="" />
            </Link>
            <Link
              to="/"
            >
              <img src={FlaskLogo} alt="" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center items-center">
          <Link to="https://github.com/daniel413x/quiz-app-frontend">
            <GitHubLogoIcon className="w-10 h-10" />
          </Link>
          <div>
            <span className="text-xs" />
            <span className="text-xs ml-1">
              QUIZGPT CONTENT MANAGEMENT SYSTEM
            </span>
          </div>
          <span className="text-xs">
            Copywrite
            &copy; 2024-2025
          </span>
        </div>
        <div />
      </div>
    </footer>
  );
}

export default Footer;
