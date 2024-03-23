import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn";
import { SubscriptionInfo_Modal_Skelaton } from "@/components/skelatons";
import { useAppSelector } from "@/hooks";
import { Blinds } from "lucide-react";

export function SubscriptionInfo_Modal() {
  const loading = useAppSelector(
    (state) => state.general.isLoading.subscriptionInfo
  );

  const plan = useAppSelector((state) => state.leads.subscriptionInfo?.plan);
  const active = useAppSelector(
    (state) => state.leads.subscriptionInfo?.active
  );
  const renewal_date = useAppSelector(
    (state) => state.leads.subscriptionInfo?.renewal_date
  );
  const API_ACCESS = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.API_ACCESS
  );
  const SEARCH_CITY = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.SEARCH_CITY
  );
  const SEARCH_ADMIN2_CODE = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.SEARCH_ADMIN2_CODE
  );
  const SEARCH_ADMIN1_CODE = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.SEARCH_ADMIN1_CODE
  );
  const SEARCH_WHOLE_COUNTRY = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.SEARCH_WHOLE_COUNTRY
  );
  const ESSENTIAL_SEARCH_FILTERS = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.ESSENTIAL_SEARCH_FILTERS
  );
  const ADVANCED_SEARCH_FILTERS = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.ADVANCED_SEARCH_FILTERS
  );
  const GMAP_EXPORT_ADDITIONAL_FIELDS = useAppSelector(
    (state) =>
      state.leads.subscriptionInfo?.features.GMAP_EXPORT_ADDITIONAL_FIELDS
  );
  const WEB_EXPORT_ADDITIONAL_FIELDS = useAppSelector(
    (state) =>
      state.leads.subscriptionInfo?.features.WEB_EXPORT_ADDITIONAL_FIELDS
  );
  const SCRAPING_SPEED = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.SCRAPING_SPEED
  );
  const EXPORT_CREDITS = useAppSelector(
    (state) => state.leads.subscriptionInfo?.features.EXPORT_CREDITS
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full p-2">
          <Blinds />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px]">
        {loading ? (
          <SubscriptionInfo_Modal_Skelaton />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Subscription Information</DialogTitle>
              <DialogDescription>{plan}</DialogDescription>
            </DialogHeader>
            <div></div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
