"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [path, setPath] = useState<string>("");
  const router = useRouter();

  const navigate = () => {
    router.push(`/${path}`);
  };

  return (
    <>
      <div className="h-screen w-screen grid grid-rows-7">
        <div className="row-span-1 border-1 flex flex-row justify-between items-center mx-2">
          <ModeToggle />
        </div>
        <div className="row-span-6 w-full border-1 gap-5 border-black flex flex-col justify-center items-center">
          <h1 className="text-4xl italic font-bold font-inter dark:text-white">
            DoPad
          </h1>
          <div className="flex w-full justify-center items-center">
            <Input
              className="sm:w-[50%] dark:text-white"
              onChange={(e) => setPath(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate();
                }
              }}
            />
            <Button variant="reverse" className="ml-2" onClick={navigate}>
              Visit Page
            </Button>
          </div>
          <p className="font-inter">A Dontpad with a few additions</p>
        </div>
      </div>
    </>
  );
}
