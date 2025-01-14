import { Button } from "@/components/ui/common/shadcn/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/common/shadcn/dropdown-menu";
import { Separator } from "@/components/ui/common/shadcn/separator";
import { CircleUserRound } from "lucide-react";

function UsernameMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center px-3 font-bold hover:text-stone-500 gap-2"
        data-testid="logged-in-menu"
      >
        <CircleUserRound />
        Admin
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-stone-500"
            onClick={() => null}
          >
            Log out
          </Button>
        </DropdownMenuItem>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UsernameMenu;
