import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Demo Site | Built by Paxway",
    robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
