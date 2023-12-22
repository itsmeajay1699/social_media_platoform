"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SingleImageDropzone from "@/components/ui/SingleDropZone";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { Api } from "@/lib/utils";
import { useRouter } from "next/navigation";
const postShema = z.object({
  privacy: z.enum(["public", "private", "friends"]),
  about: z.string(),
});

export default function UploadPostComponent({}: {}) {
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <>
      {show && <UploadPostForm setShow={setShow} />}
      <section className="flex items-center gap-4">
        <div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Upload Your New Capture{" "}
              <span className="text-primary cursor-pointer">Here</span>
            </h1>
          </div>
        </div>
        <div
          className="rounded-full bg-primary w-[34px] cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8  mx-auto text-[#00308F]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}

const UploadPostForm = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const postForm = useForm({
    resolver: zodResolver(postShema),
    defaultValues: {
      privacy: "public",
      about: "",
      media: "",
    },
  });

  const onSubmit = () => async (data: any) => {
    try {
      setLoading(true);
      //(data);
      const token = localStorage.getItem("token");
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
        data.media = res.url;
      } else {
        return toast.error("Please upload a file");
      }

      const res = await Api(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/post`,
        token as string,
        "POST",
        data
      );

      if (res.error) return toast.error(res.message);
      toast.success("Post Created");
      postForm.reset();
      setFile(null);
      router.refresh();
      setShow(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-white z-50 dark:bg-gray-800 opacity-80">
        <div className="container mx-auto px-4 h-full flex justify-center items-center">
          <div className="bg-secondary text-secondary min-h-min max-w-[800px] p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-primary dark:text-gray-200 mb-4">
                Upload Post 😃
              </h1>
              <svg
                onClick={() => setShow(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-primary cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <SingleImageDropzone
              width={400}
              height={300}
              className="p-1 border"
              value={file as any}
              onChange={(file) => {
                setFile(file as any);
              }}
            />
            <form
              className="mt-4 text-primary"
              onSubmit={postForm.handleSubmit(onSubmit())}
            >
              <label className="text-primary my-10" htmlFor="about">
                About
              </label>
              <Textarea
                id="about"
                placeholder="About"
                {...postForm.register("about")}
                className="border border-gray-300 dark:border-white focus:ring-primary focus:border-primary mt-4"
              />
              <div className="flex justify-end my-2">
                <Select
                  onValueChange={(value) => {
                    //(value);
                    postForm.setValue("privacy", value);
                  }}
                >
                  <SelectTrigger className="w-[180px] border border-gray-300 dark:border-white focus:ring-primary focus:border-primary mt-4 text-primary">
                    <SelectValue placeholder="Public" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    {/* <SelectItem value="dark">Private</SelectItem> */}
                    <SelectItem value="friends">Friends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {loading ? (
                <Button
                  className="w-full mt-4"
                  type="button"
                  disabled={loading}
                >
                  Uploading...
                </Button>
              ) : (
                <Button
                  className="w-full mt-4"
                  type="submit"
                  aria-disabled={loading}
                  disabled={loading}
                >
                  Upload
                </Button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

{
  /* <Button
  onClick={async () => {
    //(file);
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      //(res);
      setUrls({
        url: res.url,
      });
      // save the data to the database
    }
  }}
  >
  Upload
  </Button> */
}
