import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-dancing-script",
    display: "swap",
});

export default function SuccessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={dancingScript.variable}>{children}</div>;
}
