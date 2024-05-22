import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";
import action from "@/app/action";

const FormSchema = z.object({
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
});

export function LocationSearchInput({ onSubmitSuccess }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: "",
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    const current = queryString.parse(searchParams.toString());
    const query = { ...current, location: data.location };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    action();
    router.push(url);
    onSubmitSuccess();
  }

  // const onClear = () => {
  //   // if (searchParams.has("location")) {
  //   //   searchParams.delete();
  //   //   router.push(window.location.pathname);
  //   // }
  //   if (searchParams.has("location")) {
  //     searchParams.delete("location");
  //     router.push(window.location.pathname);
  //   }
  //   // const current = queryString.parse(searchParams.toString());

  //   // const url = queryString.stringifyUrl(
  //   //   {
  //   //     url: window.location.href,
  //   //     query: current,
  //   //   },
  //   //   { skipNull: true }
  //   // );
  //   // console.log({ url });
  //   // router.push(url);
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-[#00aecd]" type="submit">
          Search
        </Button>
        {/* <Button className="bg-[#00aecd]" type="button" onClick={onClear}>
          Clear
        </Button> */}
      </form>
    </Form>
  );
}
