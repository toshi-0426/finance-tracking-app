import PageHeader from "@/components/page-header";
import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Finance App",
  }
};


export default function Layout({ children }: { children: ReactNode }){
    return (
        <>
            <PageHeader className="my-8"/>
            <main>
                {children}
            </main>
            <footer className="mt-auto text-center pb-8">
                Footer
            </footer>
        </>
    )
}