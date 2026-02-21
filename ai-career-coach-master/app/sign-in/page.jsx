"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            <div className="grid-background fixed inset-0 z-0"></div>
            <Card className="w-full max-w-md bg-black/50 border-white/10 backdrop-blur-xl z-10">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center mb-4 relative inline-block mx-auto">
                        <Image
                            src="/logo.png"
                            alt="CoachAIera Logo"
                            width={300}
                            height={80}
                            className="h-24 w-auto object-contain no-download select-none"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        {/* Protective Overlay */}
                        <div className="absolute inset-0 z-10" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tighter text-white">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Choose your preferred sign-in method to continue your journey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <Button
                        variant="outline"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full h-12 border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-3 transition-all"
                    >
                        <Image
                            src="https://authjs.dev/img/providers/google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full h-12 border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-3 transition-all"
                    >
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-gray-500">
                                Safe & Secure Auth
                            </span>
                        </div>
                    </div>

                    <p className="text-center text-xs text-gray-500">
                        By continuing, you agree to CoachAIera&apos;s Terms of Service and
                        Privacy Policy.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
