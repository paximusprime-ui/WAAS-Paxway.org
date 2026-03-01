"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StickyCtaBar from "@/components/StickyCtaBar";
import ExitIntent from "@/components/ExitIntent";

/** Pages where the global Header/Footer should be hidden */
const BARE_ROUTES = ["/success"];

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isBare = BARE_ROUTES.some((r) => pathname?.startsWith(r));

    return (
        <>
            {!isBare && <Header />}
            {!isBare && pathname !== "/" && <Breadcrumbs />}
            {children}
            {!isBare && <Footer />}
            {!isBare && <StickyCtaBar />}
            {!isBare && <ExitIntent />}
        </>
    );
}
