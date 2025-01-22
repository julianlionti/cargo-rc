import { NextResponse } from "next/server";

export type Faq = { question: string; answer: string };

export async function GET() {
  const faqs: Faq[] = [
    {
      question: "How do I sign up?",
      answer:
        "Click on the Sign-Up button and follow the registration process.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and online payment platforms.",
    },
    {
      question: "Can I track my cargo in real time?",
      answer: "Yes, our platform offers real-time tracking for all deliveries.",
    },
  ];

  return NextResponse.json(faqs);
}
