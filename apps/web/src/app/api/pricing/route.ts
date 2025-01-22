import { NextResponse } from "next/server";

export type PricingPlans = { name: string; price: string; features: string[] };

export async function GET() {
  const pricingPlans: PricingPlans[] = [
    {
      name: "Basic",
      price: "$29/month",
      features: ["10 Deliveries", "Basic Tracking", "Email Support"],
    },
    {
      name: "Pro",
      price: "$79/month",
      features: [
        "Unlimited Deliveries",
        "Real-Time Tracking",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "Custom Solutions",
        "Dedicated Support",
        "Advanced Integrations",
      ],
    },
  ];

  return NextResponse.json(pricingPlans);
}
