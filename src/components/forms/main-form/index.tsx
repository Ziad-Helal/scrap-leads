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
import { getAllPlaces } from "@/store/leads-slice";

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const dispatch = useAppDispatch();

  const { countries, admin1, admin2, city } = useAppSelector(
    (state) => state.general
  );
  const {
    placeTypes: isLoadingTypes,
    admin1: isLoadingAdmin1,
    admin2: isLoadingAdmin2,
    city: isLoadingCity,
  } = useAppSelector((state) => state.general.isLoading);
  const types = useAppSelector((state) => state.leads.placeTypes);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      getAllPlaces({
        type: data.type,
        country_code: data.country,
        admin1_code: data.admin1,
        admin2_code: data.admin2,
        city: data.city,
      })
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 my-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
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
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={
                        isLoadingTypes
                          ? "Loading..."
                          : `Search in${types?.length} place types and activities...`
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
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
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
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
        <FormField
          control={form.control}
          name="admin1"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
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
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={
                        isLoadingAdmin1
                          ? "Loading..."
                          : `Search in${
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
        <FormField
          control={form.control}
          name="admin2"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
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
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={
                        isLoadingAdmin2
                          ? "Loading..."
                          : `Search in${
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
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
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
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder={
                        isLoadingCity
                          ? "Loading..."
                          : `Search in${city?.length || ""} cities...`
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
        {form.getValues("type") && form.getValues("country") && (
          <Button type="submit">Scrap</Button>
        )}
      </form>
    </Form>
  );
}
