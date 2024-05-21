import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  getAllPlaces,
  getGeoLocations,
  getPlaceTypes,
} from "@/store/leads-slice";
import { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";

const FormSchema = z.object({
  type: z.string({
    required_error: "Please select a place type or activity.",
  }),
  country: z.string({ required_error: "Please select a coutry." }),
  admin1: z.string(),
  admin2: z.string(),
  city: z.string(),
});

export function Main_Form() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [typeSelected, setTypeSelected] = useState(0);
  const [countrySelected, setCountrySelected] = useState(0);
  const [typeIsOpen, setTypeIsOpen] = useState(false);
  const [countryIsOpen, setCountryIsOpen] = useState(false);
  const [admin1IsOpen, setAdmin1IsOpen] = useState(false);
  const [admin2IsOpen, setAdmin2IsOpen] = useState(false);
  const [cityIsOpen, setCityIsOpen] = useState(false);

  const { countries, admin1, admin2, city } = useAppSelector(
    (state) => state.general
  );
  const {
    placeTypes: isLoadingTypes,
    admin1: isLoadingAdmin1,
    admin2: isLoadingAdmin2,
    city: isLoadingCity,
    allPlaces: isLoadingPlaces,
  } = useAppSelector((state) => state.general.isLoading);
  const types = useAppSelector((state) => state.leads.placeTypes);
  const searchFilters = useAppSelector((state) => state.leads.searchFilters);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      getAllPlaces({
        type: data.type,
        country_code: data.country,
        admin1_code: data.admin1,
        admin2_code: data.admin2,
        city: data.city,
        ...searchFilters,
        per_page: 25,
      })
    );
  }

  function getCountOnly() {
    dispatch(
      getAllPlaces({
        type: form.getValues("type"),
        country_code: form.getValues("country"),
        admin1_code: form.getValues("admin1"),
        admin2_code: form.getValues("admin2"),
        city: form.getValues("city"),
        ...searchFilters,
        per_page: 25,
        skip_data: 1,
      })
    );
  }

  useEffect(() => {
    dispatch(getPlaceTypes());
  }, []);

  useEffect(() => {
    if (countrySelected > 0) {
      dispatch(
        getGeoLocations({
          country_code: form.getValues("country"),
          type: "city",
        })
      );
      dispatch(
        getGeoLocations({
          country_code: form.getValues("country"),
          type: "admin1",
        })
      );
      dispatch(
        getGeoLocations({
          country_code: form.getValues("country"),
          type: "admin2",
        })
      );
    }
  }, [countrySelected]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 my-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={typeIsOpen} onOpenChange={setTypeIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? types?.find(({ id }) => id === field.value)?.text
                        : "Select a place type or an activity"}
                      <div className="ml-2 mr-5 h-4 w-4 shrink-0 flex gap-1">
                        <X
                          className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                          onClick={() => {
                            form.setValue("type", "");
                            form.setValue("country", "");
                            setTypeSelected(0);
                            setCountrySelected(0);
                          }}
                        />
                        <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                      </div>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={
                        isLoadingTypes
                          ? "Loading..."
                          : `Search in ${types?.length} place types...`
                      }
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No types or activites found.</CommandEmpty>
                      <CommandGroup>
                        {types?.map(({ id, text }) => (
                          <CommandItem
                            key={id}
                            value={text}
                            onSelect={() => {
                              form.setValue("type", id);
                              setTypeSelected((prevState) => prevState + 1);
                              setTypeIsOpen(false);
                            }}
                          >
                            {text}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                id === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {typeSelected != 0 && (
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={countryIsOpen} onOpenChange={setCountryIsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find(({ iso2 }) => iso2 == field.value)!
                              .text
                          : "Select a country"}
                        <div className="ml-2 mr-5 h-4 w-4 shrink-0 flex gap-1">
                          <X
                            className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              form.setValue("country", "");
                              form.setValue("admin1", "");
                              form.setValue("admin2", "");
                              form.setValue("city", "");
                              setCountrySelected(0);
                            }}
                          />
                          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={`Search in ${countries.length} countries...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No countries found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map(({ iso2, text }) => (
                            <CommandItem
                              key={iso2}
                              value={text}
                              onSelect={() => {
                                form.setValue("country", iso2);
                                form.setValue("admin1", "");
                                form.setValue("admin2", "");
                                form.setValue("city", "");
                                setCountrySelected(
                                  (prevState) => prevState + 1
                                );
                                setCountryIsOpen(false);
                              }}
                            >
                              {text}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  iso2 === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {countrySelected != 0 && (
          <FormField
            control={form.control}
            name="admin1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={admin1IsOpen} onOpenChange={setAdmin1IsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? admin1?.find(({ id }) => id == field.value)?.text
                          : "Select a level 1 division"}
                        <div className="ml-2 mr-5 h-4 w-4 shrink-0 flex gap-1">
                          <X
                            className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              form.setValue("admin1", "");
                              form.setValue("admin2", "");
                              form.setValue("city", "");
                              dispatch(
                                getGeoLocations({
                                  country_code: form.getValues("country"),
                                  type: "admin2",
                                })
                              );
                              dispatch(
                                getGeoLocations({
                                  country_code: form.getValues("country"),
                                  type: "city",
                                })
                              );
                            }}
                          />
                          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={
                          isLoadingAdmin1
                            ? "Loading..."
                            : `Search in ${
                                admin1?.length || ""
                              } level 1 divisions...`
                        }
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No level 1 divisions found.</CommandEmpty>
                        <CommandGroup>
                          {admin1?.map(({ id, text }) => (
                            <CommandItem
                              key={id}
                              value={text}
                              onSelect={() => {
                                form.setValue("admin1", id);
                                setAdmin1IsOpen(false);
                                dispatch(
                                  getGeoLocations({
                                    country_code: form.getValues("country"),
                                    admin1_code: id,
                                    type: "admin2",
                                  })
                                );
                                dispatch(
                                  getGeoLocations({
                                    country_code: form.getValues("country"),
                                    admin1_code: id,
                                    type: "city",
                                  })
                                );
                              }}
                            >
                              {text}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {countrySelected != 0 && (
          <FormField
            control={form.control}
            name="admin2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={admin2IsOpen} onOpenChange={setAdmin2IsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? admin2?.find(({ id }) => id == field.value)?.text
                          : "Select a level 2 division"}
                        <div className="ml-2 mr-5 h-4 w-4 shrink-0 flex gap-1">
                          <X
                            className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              form.setValue("admin2", "");
                              form.setValue("city", "");
                              dispatch(
                                getGeoLocations(
                                  form.getValues("admin1")
                                    ? {
                                        country_code: form.getValues("country"),
                                        admin1_code: form.getValues("admin1"),
                                        type: "city",
                                      }
                                    : {
                                        country_code: form.getValues("country"),
                                        type: "city",
                                      }
                                )
                              );
                            }}
                          />
                          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={
                          isLoadingAdmin2
                            ? "Loading..."
                            : `Search in ${
                                admin2?.length || ""
                              } level 2 divisions...`
                        }
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No level 2 divisions found.</CommandEmpty>
                        <CommandGroup>
                          {admin2?.map(({ id, text }) => (
                            <CommandItem
                              key={id}
                              value={text}
                              onSelect={() => {
                                form.setValue("admin2", id);
                                setAdmin2IsOpen(false);
                                dispatch(
                                  getGeoLocations({
                                    country_code: form.getValues("country"),
                                    admin2_code: id,
                                    type: "city",
                                  })
                                );
                              }}
                            >
                              {text}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {countrySelected != 0 && (
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={cityIsOpen} onOpenChange={setCityIsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? city?.find(({ id }) => id == field.value)?.text
                          : "Select a city"}
                        <div className="ml-2 mr-5 h-4 w-4 shrink-0 flex gap-1">
                          <X
                            className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                            onClick={() => {
                              form.setValue("city", "");
                            }}
                          />
                          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                        </div>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder={
                          isLoadingCity
                            ? "Loading..."
                            : `Search in ${city?.length || ""} cities...`
                        }
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No cities found.</CommandEmpty>
                        <CommandGroup>
                          {city?.map(({ id, text }) => (
                            <CommandItem
                              key={id}
                              value={text}
                              onSelect={() => {
                                form.setValue("city", id);
                                setCityIsOpen(false);
                              }}
                            >
                              {text}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {typeSelected != 0 &&
          countrySelected != 0 &&
          (isLoadingPlaces ? (
            <div>
              <LoaderCircle size="40" className="mx-auto animate-spin" />
            </div>
          ) : (
            <div className="space-x-2">
              <Button type="submit">Scrap Data</Button>
              <Button variant="outline" onClick={getCountOnly}>
                Check Data Count
              </Button>
            </div>
          ))}
      </form>
    </Form>
  );
}
