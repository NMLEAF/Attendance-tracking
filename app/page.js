import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-5xl font-bold">This is a test</h1>
      <Button className="">Hello 👋</Button>
    </div>
  );
}
