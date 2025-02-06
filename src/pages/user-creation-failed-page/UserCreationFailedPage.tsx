import logo from "@/assets/images/logo.png";
import error from "@/assets/images/domain-error-page.png";
import { Link } from "react-router-dom";

function UserCreationFailedPage() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-items-center">
      <img
        src={error}
        alt="Sorry. An error occurred while fetching your domain. Please contact admin@quizapp.com"
        className=" flex-none"
      />
      <span className="font-bold text-red-500">
        An error occurred while creating credentials.
        <br />
        Please contact
        {" "}
        <span className="underline text-violet-500">
          admin@quizapp.com
        </span>
      </span>
      <Link
        className="mt-16"
        to="/"
      >
        <img
          src={logo}
          alt="Company logo"
        />
      </Link>
    </div>
  );
}

export default UserCreationFailedPage;
