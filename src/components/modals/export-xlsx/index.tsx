import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn";
import { useAppSelector } from "@/hooks";
import { convertToXLSX } from "@/lib/utils";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export const ExportAsXLSX_Modal = () => {
  const [data, setData] = useState<Blob>();
  const exportFields = useAppSelector((state) => state.leads.exportFields);
  const GMAP_EXPORT_ADDITIONAL_FIELDS = useAppSelector(
    (state) =>
      state.leads.subscriptionInfo?.features.GMAP_EXPORT_ADDITIONAL_FIELDS
  );
  const WEB_EXPORT_ADDITIONAL_FIELDS = useAppSelector(
    (state) =>
      state.leads.subscriptionInfo?.features.WEB_EXPORT_ADDITIONAL_FIELDS
  );
  const dataToConvert = useAppSelector((state) => state.leads.allPlaces);
  const { admin1, admin2 } = useAppSelector((state) => state.general);

  useEffect(() => {
    if (dataToConvert) setData(convertToXLSX(dataToConvert, admin1!, admin2!));
  }, [dataToConvert]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-2"
          title="Download Leads"
        >
          <Download />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[850px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Download Leads</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="space-y-8 max-h-[calc(100svh-200px)] overflow-auto">
          {exportFields.map(({ name, fields }) => (
            <div key={name}>
              <p className="text-2xl font-light mb-2">{name}</p>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {fields.map((field) => (
                  <Badge
                    key={field}
                    variant={
                      name == "Essential Fields In Exports"
                        ? "default"
                        : name == "GMap Additional Fields In Exports"
                        ? GMAP_EXPORT_ADDITIONAL_FIELDS?.value
                          ? "default"
                          : "secondary"
                        : name == "Website Additional Fields In Exports" &&
                          WEB_EXPORT_ADDITIONAL_FIELDS?.value
                        ? "default"
                        : "secondary"
                    }
                  >
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          {data && (
            <a
              href={URL.createObjectURL(data)}
              download={`${Date.now()}.xlsx`}
              className="inline-block w-full"
            >
              <Button className="w-full">Download as XLSX</Button>
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
