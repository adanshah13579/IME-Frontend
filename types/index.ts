import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DoctorCardProps = {
  name: string;
  specialty: string;
  experienceYears: number;
  location: string;
  status: "open" | "closed";
  rating: number;
  completedIMEs: number;
  startingPrice: number;
  image: string;
  slug: string;
};

export type IMECardProps = {
  title: string;
  category: string;
  description: string;
};

export type Doctor = {
  name: string;
  specialty: string;
  experienceYears: number;
  location: string;
  status: "open" | "closed";
  rating: number;
  startingPrice: number;
  image: string;
  slug: string;
  videoResume: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  aboutMe: string;
  completedIMEs: Array<{
    title: string;
    category: string;
    description: string;
  }>;
};
