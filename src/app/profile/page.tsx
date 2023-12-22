"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { images } from "@/assets";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Api, cn } from "@/lib/utils";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import ImageInput from "./ImageInput";
import { useState } from "react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  full_name: z.string().max(30).min(3),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4).optional(),
  phone_number: z.string().max(10).min(10).optional(),
  //  its an File type
  profile_photo: z.unknown().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { edgestore } = useEdgeStore();
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState({} as any);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // value coming from the server
    defaultValues: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      full_name: user.full_name,
      phone_number: user,
    },
  });

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await Api(
          `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/user/getUser`,
          token as string,
          "GET"
        );
        setUser(data.user);

        form.reset({
          username: data.user.username || "",
          email: data.user.email || "",
          bio: data.user.bio || "",
          full_name: data.user.full_name || "",
          phone_number: data.user.phone_number || "",
        });
      } catch (err) {
        //(err);
      }
    };
    getUser();
  }, [form, refresh]);

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setLoading(true);
      delete data.profile_photo; // remove the profile_photo from the data
      const token = localStorage.getItem("token");
      let resEdgeStore: any;
      if (file) {
        resEdgeStore = await edgestore.publicFiles.upload({
          file,
          options: {
            temporary: true,
          },
        });
        data.profile_photo = resEdgeStore.url;
        const checkPhoto = "https://i.imgur.com/6VBx3io.png";
        if (user.profile_photo !== checkPhoto) {
          const deletePhoto = await edgestore.publicFiles.delete({
            url: user.profile_photo,
          });
        }
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/user/update`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();

      if (response.error) {
        return toast.error(response.message);
      }

      if (response && file) {
        // console.log(resEdgeStore.url);
        const confirm = await edgestore.publicFiles.confirmUpload({
          url: resEdgeStore.url,
        });
      }

      toast.success("Profile updated successfully");
      setRefresh(!refresh);
    } catch (err) {
      toast.error("Something went wrong");
      //(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      {/* <ImageInput /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-6">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile photo</FormLabel>
                <FormControl>
                  <ImageInput
                    field={field}
                    url={user.profile_photo}
                    setFile={setFile}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is account unique name that will be used to find you by
                  the community.
                </FormDescription> */}
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
                  <Input placeholder="should be unique" {...field} />
                </FormControl>
                <FormDescription>
                  This is account unique name that will be used to find you by
                  the community.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name.
                  You can change it at any time. This name will be displayed on
                  your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>{/*  */}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl></FormControl>
                <FormDescription>
                  <Input placeholder="phone number" {...field} />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            Update profile
          </Button>
        </form>
      </Form>
    </>
  );
}
