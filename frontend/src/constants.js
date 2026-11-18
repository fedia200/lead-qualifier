export const INTENTS = {
  purchase: { label: "Purchase", color: "bg-emerald-100 text-emerald-800" },
  pricing: { label: "Pricing", color: "bg-sky-100 text-sky-800" },
  partnership: { label: "Partnership", color: "bg-violet-100 text-violet-800" },
  support: { label: "Support", color: "bg-amber-100 text-amber-800" },
  spam: { label: "Spam", color: "bg-red-100 text-red-800" },
  other: { label: "Other", color: "bg-stone-200 text-stone-700" },
};

export const SAMPLES = [
  {
    title: "Hot lead",
    message:
      "Hi, I'm Sarah Connor, CTO at Acme Logistics (sarah@acme-logistics.com). We want to automate our inbound lead handling and have a budget of around $15,000. We'd like to start within 3 weeks. Can you send a quote?",
  },
  {
    title: "Support request",
    message:
      "Hello, I've been unable to log in since yesterday. I get an error every time I reset my password. Please help, this is blocking my whole team.",
  },
  {
    title: "Spam",
    message:
      "CONGRATULATIONS!!! You won a FREE iPhone. Click this link now to claim your prize before it expires!!!",
  },
];

export function scoreColor(score) {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-stone-400";
}
