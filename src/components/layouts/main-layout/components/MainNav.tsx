import {
  Link, useLocation,
} from "react-router-dom";
import {
  FEEDBACK_ROUTE,
  QUIZ_ROUTE,
  STATS_ROUTE,
} from "@/lib/consts";
import {
  BarChart,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useIsAuthenticated from "@/lib/hooks/useIsAuthenticated";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const links = [
  {
    to: `/${QUIZ_ROUTE}`,
    label: "Quizzes",
    icon: <List className="w-5 h-5" strokeWidth={1.25} />,
  },
  {
    to: `/${STATS_ROUTE}`,
    label: "Stats",
    icon: <BarChart className="w-5 h-5" strokeWidth={1.25} />,
  },
  {
    to: `/${FEEDBACK_ROUTE}`,
    label: "Feedback (0)",
    icon: <ChatBubbleIcon className="w-5 h-5" strokeWidth={1.25} />,
  },
];

interface MainNavProps {
  mobile?: boolean;
}

function MainNav({
  mobile,
}: MainNavProps) {
  const location = useLocation();
  const { pathname } = location;
  const py = 2;
  const isAuthenticated = useIsAuthenticated();
  return !isAuthenticated ? null : (
    <ul className={cn("flex flex-col", {
      "": !mobile,
      "flex-col": mobile,
    })}
    >
      {links.map(({ to, icon, label }) => (
        <li key={to}>
          <Link
            to={to}
            // don't resize parent
            className={cn(` relative group flex items-center gap-2 py-${py} -my-${py} px-3.5 rounded-md w-full`, {
              "bg-stone-500 text-white": to === pathname,
              "text-black hover:text-stone-500": to !== pathname,
            })}
          >
            {icon}
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MainNav;
