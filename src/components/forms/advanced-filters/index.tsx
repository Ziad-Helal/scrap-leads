import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSearchFilters } from "@/store/leads-slice";
import { toast } from "sonner";

const FormSchema = z.object({
  is_main_type: z.enum(["all", "1", "0"]).optional(),
  is_closed: z.enum(["all", "1", "0"]).optional(),
  has_website: z.enum(["all", "1", "0"]).optional(),
  has_phone: z.enum(["all", "1", "0"]).optional(),
  has_email: z.enum(["all", "1", "0"]).optional(),
  has_facebook: z.enum(["all", "1", "0"]).optional(),
  has_instagram: z.enum(["all", "1", "0"]).optional(),
  has_youtube: z.enum(["all", "1", "0"]).optional(),
  has_twitter: z.enum(["all", "1", "0"]).optional(),
  has_linkedin: z.enum(["all", "1", "0"]).optional(),
  is_claimed: z.enum(["all", "1", "0"]).optional(),
  price_range: z.enum(["all", "$", "$$", "$$$", "$$$$"]).optional(),
  reviews_rating_lte: z
    .union([
      z.undefined(),
      z.string().regex(/^[0-5]$/, "0 ~ 5"),
      z.string().trim().length(0),
    ])
    .optional(),
  reviews_rating_gte: z
    .union([
      z.undefined(),
      z.string().regex(/^[0-5]$/, "0 ~ 5"),
      z.string().trim().length(0),
    ])
    .optional(),
  reviews_count_lte: z
    .union([
      z.undefined(),
      z.string().regex(/^(?:0|[1-9]\d{0,3})$/, "0 ~ 9999"),
      z.string().trim().length(0),
    ])
    .optional(),
  reviews_count_gte: z
    .union([
      z.undefined(),
      z.string().regex(/^(?:0|[1-9]\d{0,3})$/, "0 ~ 9999"),
      z.string().trim().length(0),
    ])
    .optional(),
  gmap_photos_count_lte: z
    .union([
      z.undefined(),
      z.string().regex(/^(?:0|[1-9]\d{0,3})$/, "0 ~ 9999"),
      z.string().trim().length(0),
    ])
    .optional(),
  gmap_photos_count_gte: z
    .union([
      z.undefined(),
      z.string().regex(/^(?:0|[1-9]\d{0,3})$/, "0 ~ 9999"),
      z.string().trim().length(0),
    ])
    .optional(),
  has_contact_pages: z.enum(["all", "1", "0"]).optional(),
  has_ad_pixels: z.enum(["all", "1", "0"]).optional(),
});

export function AdvancedFilters_Form() {
  const dispatch = useAppDispatch();
  const searchFilters = useAppSelector((state) => state.leads.searchFilters);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: searchFilters,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(setSearchFilters(data));
    toast("Filters Updated Successfully.", {
      classNames: {
        title: "text-green-500",
        toast: "group-[.toaster]:pointer-events-auto",
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-h-[calc(100svh-200px)] overflow-auto"
      >
        <fieldset>
          <legend className="text-3xl font-light tracking-wider mb-2">
            Essential Filters
          </legend>
          <div className="grid gap-6 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="is_main_type"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">Main Activity only</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_closed"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">Permanently Closed</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_website"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">Has Website</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_phone"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">Has Phone</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">Has Email</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_facebook"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Account on Facebook
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_instagram"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Account on Instagram
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_youtube"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Account on Youtube
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_twitter"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Account on Twitter
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_linkedin"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Account on Linkedin
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-3xl font-light tracking-wider mb-2">
            Advanced filters
          </legend>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">
                Average Rating on Google Maps
              </p>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="reviews_rating_lte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviews_rating_gte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <p className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">
                Ratings Count on Google Maps
              </p>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="reviews_count_lte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviews_count_gte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <p className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">
                Number of Photos on Google Maps
              </p>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="gmap_photos_count_lte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gmap_photos_count_gte"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          {...field}
                          className="max-w-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="is_claimed"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Claimd on Google Maps
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_contact_pages"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Contact Form on Their Website
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_ad_pixels"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-lg">
                    Has Advertising Pixels on their Website
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 items-center"
                    >
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">All</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
