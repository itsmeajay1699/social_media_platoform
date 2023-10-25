"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { set } from "zod";
import Image from "next/image";

export default function ImageInput({ field, url }: any) {
  const [image, setImage] = React.useState<File | null>();
  const [file, setFile] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const onChangeHandler = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFile(URL.createObjectURL(file));
      setPreview(URL.createObjectURL(file));

    }
  };

  return (
    <>
      {preview || url ? (
        <>
          <div className="w-[120px] h-[120px] rounded-full mb-4 flex relative">
            <Image
              src={preview ? preview : url}
              alt="user profile"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div
              onClick={() => {
                setImage(null);
                setFile("");
                setPreview("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-white rounded-full bg-gray-800 p-1 cursor-pointer absolute top-0 right-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div
              onClick={() => {
                console.log("clicked");
                document?.getElementById("fileInput")?.click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-white rounded-full bg-gray-800 p-1 cursor-pointer absolute bottom-0 right-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <Input
              type="file"
              id="fileInput"
              placeholder=""
              className="w-[120px] h-[120px] rounded-full mb-4  hidden"
              {...field}
              onChange={onChangeHandler}
            />
          </div>
        </>
      ) : (
        <>
          <Input
            type="file"
            id="fileInput"
            placeholder=""
            className="w-[120px] h-[120px] rounded-full mb-4 flex"
            {...field}
            onChange={onChangeHandler}
          />
        </>
      )}
    </>
  );
}
