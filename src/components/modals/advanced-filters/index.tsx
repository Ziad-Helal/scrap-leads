import { AdvancedFilters_Form } from "@/components/forms";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn";
import { SlidersHorizontal } from "lucide-react";

export function AdvancedFilters_Modal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-2"
          title="Search Filters"
          disabled
        >
          <SlidersHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px]">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold">
            Search Filters
          </DialogTitle>
        </DialogHeader>
        <AdvancedFilters_Form />
      </DialogContent>
    </Dialog>
  );
}
