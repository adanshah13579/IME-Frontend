import "@/styles/globals.css";
import { Navbar } from "@/app/(public)/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className=" bg-white  px-4  pt-1" >
        {children}
      </main>
    </>
  );
}
