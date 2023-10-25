"use client";

import { Button } from "@/components/ui/button";
import PostCard from "./PostCard";
import * as React from "react";
import dynamic from "next/dynamic";
import { useEdgeStore } from "@/lib/edgestore";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { set, z } from "zod";
import { toast } from "sonner";

const SingleImageDropzone = dynamic(
  () => import("@/components/ui/SingleDropZone"),
  { ssr: false }
);

const schema = z.object({
  url: z.string(),
  bio: z.string().min(50),
});

export default function Feed({
  data,
  upload,
}: {
  data: any;
  upload?: boolean;
}) {
  const [file, setFile] = React.useState<File>();
  const [show, setShow] = React.useState<boolean>(false);
  const [urls, setUrls] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      url: "",
      bio: "",
    },
  });

  const { edgestore } = useEdgeStore();

  return (
    <section>
      {upload && (
        <>
          {show && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <button
                  onClick={() => {
                    setShow(false);
                    setFile(undefined);
                    setValue("bio", "");
                  }}
                  className="text-secondary text-right w-full mb-2"
                >
                  Close
                </button>
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  className="z-50 bg-white"
                  onChange={(file) => setFile(file)}
                />
                <label htmlFor="bio">
                  <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Bio
                  </h1>
                </label>
                <Input
                  className="mt-2 text-secondary"
                  {...register("bio", { required: true })}
                />

                <Button
                  className="mt-2"
                  disabled={!file || loading}
                  onClick={async () => {
                    if (file) {
                      try {
                        setLoading(true);
                        const values = getValues();
                        if (values.bio.length < 50)
                          return toast.error(
                            "Bio must be greater than 50 characters"
                          );
                        const res = await edgestore.publicFiles.upload({
                          file,
                        });
                        setValue("url", res.url);
                        const parseData = schema.safeParse({
                          url: res.url,
                          bio: values.bio,
                        });

                        if (!parseData.success) {
                          toast.error(
                            "something went wrong with the input data"
                          );
                          return;
                        }
                        // save the data to the database
                        const body = parseData.data;
                        toast.success("post uploaded successfully");
                      } catch (err) {
                        toast.error("something went wrong from database");
                        console.log(err);
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>
          )}

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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {Array.from({ length: 20 - 1 }).map((_, i) => (
          <PostCard key={Math.random()} />
        ))}
      </div>
    </section>
  );
}

{
  /* <Button
onClick={async () => {
  console.log(file);
  if (file) {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    console.log(res);
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
