/**
 * All site copy and data lives here. Edit this file to update the site.
 *
 * NOTE: the case studies and testimonials below are illustrative examples
 * written for the build. Swap in real, approved ones when available.
 */

export const site = {
  name: "Accentio",
  url: "https://www.accentiogroup.com",
  tagline: "Boutique recruitment firm",
  description:
    "Accentio is a boutique recruitment firm placing leaders and specialists in sales, marketing, technology, product, HR and finance across North America. 1,000+ placements, 98% fill rate, shortlists in a week.",
  email: "mateo@accentiogroup.com",
  phone: "+1 (647) 517-3505",
  phoneHref: "tel:+16475173505",
  location: "Toronto, Canada",
  linkedin: "https://www.linkedin.com/in/mateopolic/",
};

export const nav = [
  { label: "Results", href: "#results" },
  // "Employers" opens the "how we work" funnel, which leads into the employer pitch.
  { label: "Employers", href: "#process" },
  { label: "Candidates", href: "#candidates" },
  { label: "Team", href: "#team" },
];

export const hero = {
  titleLead: "The leaders you need,",
  titleAccent: "when you need\u00a0them.",
  // Alternatives offered: "Senior roles, shortlisted in days — not months." / "Exceptional leaders. Placed fast."
  body: "Accentio is a boutique recruitment firm. For ten years we've helped founders, boards and leadership teams hire the people who define what comes next — from founding team members to the C-suite.",
};

/** Hero card: what we recruit for, with example roles. */
export const specialties = [
  { name: "C-suite & leadership", roles: "CEO, COO, GM" },
  { name: "Sales", roles: "CRO, VP Sales, AEs" },
  { name: "Marketing", roles: "CMO, Growth, Brand" },
  { name: "Technology", roles: "CTO, Engineering" },
  { name: "Product", roles: "CPO, Product leads" },
  { name: "AI & data", roles: "Head of AI, Data" },
  { name: "Finance", roles: "CFO, Controllers" },
  { name: "HR & people", roles: "People leads, HRBPs" },
];

/** Map section under the hero (the constellation becomes North America). */
export const reach = {
  titleLead: "One partner,",
  titleAccent: "all of North America.",
  body: "We recruit for companies across Canada and the United States — remote, hybrid or on-site.",
};

export const stats = [
  { value: 10, suffix: "", label: "Years in recruitment" },
  { value: 1000, suffix: "+", label: "Leaders and specialists placed" },
  { value: 98, suffix: "%", label: "Fill rate on searches we take on" },
  { value: 96, suffix: "%", label: "Of shortlists delivered within a week" },
];

/** Logo files live in /public/clients as single-color alpha PNGs (w × h in px). */
export const clients = [
  { name: "Shopify", file: "shopify", w: 490, h: 140 },
  { name: "General Motors", file: "generalmotors", w: 522, h: 140 },
  { name: "HelloFresh", file: "hellofresh", w: 430, h: 140 },
  { name: "Subaru", file: "subaru", w: 560, h: 76 },
  { name: "RBC", file: "rbc", w: 387, h: 140 },
  { name: "Bed Bath & Beyond", file: "bedbathbeyond", w: 479, h: 140 },
  { name: "Sleep Country", file: "sleepcountry", w: 244, h: 140 },
  { name: "SodaStream", file: "sodastream", w: 560, h: 69 },
  { name: "Wolters Kluwer", file: "wolterskluwer", w: 560, h: 89 },
  { name: "Swoop", file: "swoop", w: 519, h: 140 },
  { name: "Knix", file: "knix", w: 361, h: 140 },
  { name: "Gorgias", file: "gorgias", w: 560, h: 134 },
  { name: "Homebase", file: "homebase", w: 560, h: 85 },
  { name: "Vendasta", file: "vendasta", w: 560, h: 84 },
  { name: "SaaStr", file: "saastr", w: 407, h: 140 },
  { name: "Real Chemistry", file: "realchemistry", w: 560, h: 95 },
];

export const process = {
  title: "Fast, because the right hire can't wait.",
  body: "We keep our client list small on purpose. Each search gets personalized attention from the first call to the signed offer.",
  steps: [
    {
      title: "Brief",
      status: "Briefing call",
      body: "We dig into the role, the team and the culture you're building — what success looks like a year from now, not just a job description.",
    },
    {
      title: "Search",
      status: "Mapping the market",
      body: "We go straight to our network of proven leaders, including strong performers who aren't actively looking but are open to the right move.",
    },
    {
      title: "Shortlist",
      status: "Shortlist delivered",
      body: "A focused shortlist of vetted, interested candidates. 96% of the time, it's in your inbox within one week.",
    },
    {
      title: "Hire",
      status: "Offer signed",
      body: "We run interviews, references and offer negotiation end-to-end, and stay close after the start date.",
    },
  ],
};

export const employers = {
  id: "employers",
  title: "Hiring a leader who has to get it right?",
  body: "From a high-stakes CTO search to building out a marketing team, we've done it for global brands and fast-growing startups alike.",
  points: [
    "C-level, VP and senior specialist searches",
    "Shortlist within one week — 96% of the time",
    "98% of the searches we take on are filled",
    "Confidential searches handled with discretion",
  ],
  cta: { label: "Discuss a search", href: `mailto:${site.email}?subject=New%20search` },
};

export const candidates = {
  id: "candidates",
  title: "Ready for the role that changes your trajectory?",
  body: "We work with ambitious people at every stage — from rising managers to seasoned executives — and we'll be straight with you about fit.",
  points: [
    "Introductions to great companies across North America",
    "Honest advice on compensation, offers and timing",
    "Confidential conversations — your search stays private",
    "One point of contact from first call to start date",
  ],
  cta: {
    label: "Send us your CV",
    href: `mailto:${site.email}?subject=Candidate%20introduction`,
  },
};

export const caseStudies = {
  title: "Proof, not promises.",
  items: [
    {
      role: "VP Engineering",
      company: "Series B SaaS scale-up · Toronto",
      summary:
        "Replaced a departing engineering leader ahead of a major platform rebuild, without slowing the roadmap.",
      metrics: [
        { label: "Shortlist", value: "5 days" },
        { label: "Time to offer", value: "6 weeks" },
      ],
    },
    {
      role: "Chief Marketing Officer",
      company: "National consumer brand · Canada",
      summary:
        "Found a brand-builder with D2C and retail experience to lead a repositioning across stores and online.",
      metrics: [
        { label: "Shortlist", value: "7 days" },
        { label: "Candidates met", value: "4" },
      ],
    },
    {
      role: "Head of AI",
      company: "E-commerce platform · United States",
      summary:
        "Sourced a rare blend of research depth and product instinct for a newly created AI team.",
      metrics: [
        { label: "Shortlist", value: "6 days" },
        { label: "Still in role", value: "2 yrs+" },
      ],
    },
  ],
};

export const testimonials = [
  {
    quote:
      "Accentio understood what we needed better than our own job description did. The shortlist was small, sharp and on time.",
    title: "CEO, Series B fintech",
  },
  {
    quote:
      "We've used larger firms before. None of them moved this fast, or cared this much about getting the culture right.",
    title: "Chief People Officer, retail brand",
  },
  {
    quote:
      "Mateo told me honestly when a role wasn't right — and then found me the one that was.",
    title: "VP Sales, placed 2025",
  },
];

export const team = {
  title: "Senior people, on every search.",
  members: [
    {
      name: "Mateo Polic",
      // TODO: confirm title with Mateo
      title: "Founder",
      linkedin: "https://www.linkedin.com/in/mateopolic/",
      // Headshots live in /public/team (square, 480px)
      photo: "/team/mateo-polic.webp",
      bio: "Mateo arrived in Toronto from Croatia in 2013 with two duffle bags and a lot of ambition. After recruiting at Michael Page and Shopify, he founded Accentio and has since partnered with founders, C-level executives and boards at 50+ companies across four continents — including Shopify, FreshBooks and HelloFresh.",
      aside: "Invests in early-stage Toronto startups. Plays chess and basketball.",
    },
    {
      name: "Iryna Korsunska",
      // TODO: confirm title with Mateo
      title: "Talent Partner",
      linkedin: "https://www.linkedin.com/in/irynakorsunska/",
      photo: "/team/iryna-korsunska.webp",
      bio: "Iryna started at Michael Page before leading talent acquisition at Thriver, a Toronto SaaS startup, where she built the HR function from scratch and helped grow the team from 56 to 220 people in three years, across 13 offices and a Series B.",
      aside: "Specializes in building high-performing teams with real cultural fit.",
    },
  ],
};

export const contact = {
  title: "Your next great hire starts with a conversation.",
  body: "Tell us about the role you need to fill — or the move you're thinking about making. Call or email, and you'll speak with a partner directly.",
};
