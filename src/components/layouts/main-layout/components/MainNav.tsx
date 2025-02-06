import {
  Link, useLocation,
} from "react-router-dom";
import {
  FEEDBACK_ROUTE,
  QUIZZES_ROUTE,
  SETTINGS_ROUTE,
  STATS_ROUTE,
} from "@/lib/consts";
import {
  BarChart,
  List,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useIsAuthenticated from "@/lib/hooks/useIsAuthenticated";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useGetDomain } from "@/lib/api/DomainApi";

const links = [
  {
    to: `/${QUIZZES_ROUTE}`,
    label: "Quizzes",
    icon: <List className="w-5 h-5" strokeWidth={2} />,
  },
  {
    to: `/${STATS_ROUTE}`,
    label: "Stats",
    icon: <BarChart className="w-5 h-5" strokeWidth={2} />,
  },
  {
    to: `/${FEEDBACK_ROUTE}`,
    label: "Feedback (0)",
    icon: <ChatBubbleIcon className="w-5 h-5" />,
  },
  {
    to: `/${SETTINGS_ROUTE}`,
    label: "Settings",
    icon: <Settings className="w-5 h-5" strokeWidth={2} />,
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
  const {
    domain,
  } = useGetDomain();
  return !isAuthenticated ? null : (
    <ul className={cn("flex flex-col", {
      "": !mobile,
      "flex-col": mobile,
    })}
    >
      {links.map(({ to, icon, label }) => (
        <li key={to}>
          <Link
            to={`/${domain?.slug}${to}`}
            // don't resize parent
            className={cn(`relative group flex items-center gap-2 font-medium py-${py} -my-${py} px-3.5 rounded-md w-full`, {
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
