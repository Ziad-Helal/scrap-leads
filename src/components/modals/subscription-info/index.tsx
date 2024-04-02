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
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  getAllPlaces,
  getGeoLocations,
  getPlaceTypes,
  getSubscriptionInfo,
} from "@/store/leads-slice";
import { Blinds } from "lucide-react";
import { useEffect } from "react";

export function SubscriptionInfo_Modal() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) => state.general.isLoading.subscriptionInfo
  );
  const allPlaces = useAppSelector((state) => state.leads.allPlaces);

  const plan = useAppSelector((state) => state.leads.subscriptionInfo?.plan);
  const on_trial = useAppSelector(
    (state) => state.leads.subscriptionInfo?.on_trial
  );
  const active = useAppSelector(
    (state) => state.leads.subscriptionInfo?.active
  );
  const renewal_date = useAppSelector(
    (state) => state.leads.subscriptionInfo?.renewal_date
  );
  const pending_cancelation = useAppSelector(
    (state) => state.leads.subscriptionInfo?.pending_cancelation
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

  const renewalDate = new Date(renewal_date!);

  useEffect(() => {
    dispatch(getSubscriptionInfo());
  }, [allPlaces]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-2"
          title="Subscription Information"
        >
          <Blinds />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px]">
        {loading ? (
          <SubscriptionInfo_Modal_Skelaton />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="capitalize text-3xl">{plan}</DialogTitle>
              <DialogDescription className="flex gap-1 flex-wrap justify-center sm:justify-start">
                <span
                  className={`text-foreground ${
                    active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {on_trial ? "Trial" : "Subscription"}
                </span>
                <span>
                  | Will{" "}
                  <span
                    className={`${
                      pending_cancelation ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {pending_cancelation ? "end" : "renew"}
                  </span>{" "}
                  in
                </span>
                <span className="text-foreground">
                  {renewalDate.toLocaleDateString()}
                </span>
                <span>at</span>
                <span className="text-foreground">
                  {renewalDate.toLocaleTimeString("en-US", { hour12: true })}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[calc(100svh-200px)] overflow-auto">
              {EXPORT_CREDITS && (
                <div>
                  <div className="space-x-2">
                    <span className="capitalize text-xl">
                      {EXPORT_CREDITS.name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Remaining: {EXPORT_CREDITS.remaining}
                    </span>
                  </div>
                  <div className="space-x-3">
                    <span className="text-muted-foreground text-sm">
                      Total: {EXPORT_CREDITS.total}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Consumed: {EXPORT_CREDITS.consumed}
                    </span>
                  </div>
                </div>
              )}
              {SCRAPING_SPEED && (
                <div className="space-x-2">
                  <span className="capitalize text-xl">
                    {SCRAPING_SPEED.name}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {SCRAPING_SPEED.value}
                  </span>
                </div>
              )}
              {API_ACCESS && (
                <div className="space-x-2">
                  <span className="capitalize text-xl">{API_ACCESS.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {API_ACCESS.value}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xl mb-2">Features</p>
                <ul className="grid gap-1 lg:grid-cols-2">
                  {SEARCH_CITY && (
                    <li
                      className={`capitalize ${
                        SEARCH_CITY.value ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {SEARCH_CITY.name}
                    </li>
                  )}
                  {SEARCH_ADMIN2_CODE && (
                    <li
                      className={`capitalize ${
                        SEARCH_ADMIN2_CODE.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {SEARCH_ADMIN2_CODE.name}
                    </li>
                  )}
                  {SEARCH_ADMIN1_CODE && (
                    <li
                      className={`capitalize ${
                        SEARCH_ADMIN1_CODE.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {SEARCH_ADMIN1_CODE.name}
                    </li>
                  )}
                  {SEARCH_WHOLE_COUNTRY && (
                    <li
                      className={`capitalize ${
                        SEARCH_WHOLE_COUNTRY.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {SEARCH_WHOLE_COUNTRY.name}
                    </li>
                  )}
                  {ESSENTIAL_SEARCH_FILTERS && (
                    <li
                      className={`capitalize ${
                        ESSENTIAL_SEARCH_FILTERS.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {ESSENTIAL_SEARCH_FILTERS.name}
                    </li>
                  )}
                  {ADVANCED_SEARCH_FILTERS && (
                    <li
                      className={`capitalize ${
                        ADVANCED_SEARCH_FILTERS.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {ADVANCED_SEARCH_FILTERS.name}
                    </li>
                  )}
                  {GMAP_EXPORT_ADDITIONAL_FIELDS && (
                    <li
                      className={`capitalize ${
                        GMAP_EXPORT_ADDITIONAL_FIELDS.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {GMAP_EXPORT_ADDITIONAL_FIELDS.name}
                    </li>
                  )}
                  {WEB_EXPORT_ADDITIONAL_FIELDS && (
                    <li
                      className={`capitalize ${
                        WEB_EXPORT_ADDITIONAL_FIELDS.value
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {WEB_EXPORT_ADDITIONAL_FIELDS.name}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
