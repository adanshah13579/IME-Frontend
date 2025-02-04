export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Post an IME",
      href: "/http://localhost:5173/signin",
    },
    {
      label: "Search for IME's",
      href: `/doctor-search`,
    },
    {
      label: "your Appoinments",
      href: "/appointment",
    },
    {
      label: "About Us",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Post an IME",
      href: "/http://localhost:5173/signin",
    },
    {
      label: "Search for IME's",
      href: "/",
    },
    {
      label: "Our Pricing",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Sign Up",
      href: "/signup",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
