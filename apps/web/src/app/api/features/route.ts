import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";

export type Feature = { title: string; description: string };

export async function GET() {
  const t = await getTranslations();

  const features: Feature[] = [
    {
      title: t("features.delivery.title"),
      description: t("features.delivery.description"),
    },
    {
      title: t("features.tracking.title"),
      description: t("features.tracking.description"),
    },
    {
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ];

  return NextResponse.json(features);
}
