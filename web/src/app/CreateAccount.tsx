import { Card, CardContent, CardHeader } from "@app/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { StateContext } from "@app/components/providers/StateContext";

const formSchema = z.object({
  image: z.string().min(2).max(256),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  username: z.string().min(3).max(50),
});

export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $owner: AccountOwner
    $firstName: String
    $lastName: String
    $image: String
    $username: String
  ) {
    createAccount(
      accountId: $owner
      firstName: $firstName
      lastName: $lastName
      image: $image
      username: $username
    )
  }
`;

export const CreateAccount = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      firstName: "",
      lastName: "",
      username: "",
    },
  });

  const [createAccount] = useMutation<
    { data: string },
    {
      owner: string;
      image: string;
      firstName: string;
      lastName: string;
      username: string;
    }
  >(UPDATE_ACCOUNT_MUTATION, {
    onError: (error) => console.error(error),
    onCompleted: () => {
      window.location.reload();
    },
  });

  const { accountId } = useContext(StateContext);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
    const { success } = formSchema.safeParse(values);
    if (success)
      void createAccount({
        variables: {
          owner: `User:${accountId}`,
          image: values.image,
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
        },
      });
  }

  return (
    <>
      <Card className="h-fit">
        <CardHeader className="flex flex-row items-center gap-4">
          Create Account
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                //   console.log("submit called", invalid, values);

                onSubmit(form.getValues());
                // });
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription>First Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormDescription>Last Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="@johndoe" {...field} />
                    </FormControl>
                    <FormDescription>Your username</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL (https://...)" {...field} />
                    </FormControl>
                    <FormDescription>Image Link</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Account</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
