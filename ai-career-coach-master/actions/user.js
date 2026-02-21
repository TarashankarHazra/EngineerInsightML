"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  try {
    // 1. Check if industry insight already exists
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    // 2. If it doesn't exist, create it with default values, then try to update with AI data
    if (!industryInsight) {
      let insights = {
        salaryRanges: [],
        growthRate: 0,
        demandLevel: "Medium",
        topSkills: [],
        marketOutlook: "Neutral",
        keyTrends: ["Tracking industry trends..."],
        recommendedSkills: [],
      };

      try {
        insights = await generateAIInsights(data.industry);
      } catch (aiError) {
        console.error("AI Insight generation failed... using default values:", aiError);
        // Continue with default insights
      }

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // 3. Update the user within a transaction for safety
    const result = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
    });

    revalidatePath("/");
    return { success: true, result };
  } catch (error) {
    console.error("Error in updateUser server action:", error);
    throw new Error(error.message || "Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      industry: true,
    },
  });

  if (!user) throw new Error("User not found");

  return {
    isOnboarded: !!user?.industry,
  };
}
