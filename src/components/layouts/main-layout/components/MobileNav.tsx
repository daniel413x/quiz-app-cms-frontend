import { CircleUserRound, Menu } from "lucide-react";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger,
} from "@/components/ui/common/shadcn/sheet";
import { Separator } from "@/components/ui/common/shadcn/separator";
import useIsAuthenticated from "@/lib/hooks/useIsAuthenticated";
import MobileNavLinks from "./MobileNavLinks";
import MainNav from "./MainNav";

function MobileNav() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-stone-500" aria-label="open menu" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center fold-bold gap-2">
              <CircleUserRound className="text-stone-500" />
              Admin
            </span>
          ) : (
            <span>
              Welcome to Warehouse Admins.
            </span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          <MainNav mobile />
          {isAuthenticated ? <MobileNavLinks /> : (
            <Button
              className="flex-1 font-bold bg-stone-500"
              onClick={() => null}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
