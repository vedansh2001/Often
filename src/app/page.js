"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/create");
  }, [router]);

  return (
    <div className="h-screen w-[100%] flex items-center justify-center">
      Loading
    </div>
  );
}
