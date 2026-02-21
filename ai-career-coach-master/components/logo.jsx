"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="select-none relative inline-block" suppressHydrationWarning>
            <Image
                src="/logo.png"
                alt="CoachAIera Logo"
                width={300}
                height={80}
                className="h-16 w-auto object-contain no-download"
                priority
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
            />
            {/* Protective Overlay */}
            <div className="absolute inset-0 z-10 cursor-pointer" />
        </Link>
    );
}
