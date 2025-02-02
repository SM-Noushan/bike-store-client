import React, { useState, ChangeEvent } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// FooterListTitle Component
interface FooterListTitleProps {
  title: string;
}

const FooterListTitle: React.FC<FooterListTitleProps> = ({ title }) => (
  <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl sm:hidden lg:block">
    {title}
  </h1>
);

// FooterLinkList Component for rendering a vertical list of links
interface FooterLinkListProps {
  links: { label: string; href?: string }[];
}

const FooterLinkList: React.FC<FooterLinkListProps> = ({ links }) => (
  <div className="flex flex-col items-center lg:items-end mt-5 space-y-2">
    {links.map((link, index) => (
      <a
        key={index}
        href={link.href || "#"}
        className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
      >
        {link.label}
      </a>
    ))}
  </div>
);

// NewsletterSubscription Component
const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      setError("Please enter your email address");
    } else {
      setSubscribed(true);
      setError("");
      setEmail("");
    }
  };

  return (
    <>
      <FooterListTitle title="Subscribe our newsletter to get update." />
      <div className="flex flex-col mx-auto mt-6 sm:mt-0 lg:mt-6 space-y-3 sm:space-y-0 sm:flex-row">
        <Input
          id="email"
          type="text"
          value={email}
          className="sm:w-72 bg-white"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Email Address"
        />
        <Button
          onClick={handleSubscribe}
          className="w-full md:w-auto sm:mx-4"
          variant="default"
        >
          Subscribe
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {subscribed && (
        <p className="text-green-600 text-sm mt-2">Subscribed successfully!</p>
      )}
    </>
  );
};

// SocialIcons Component
interface SocialIconItem {
  href: string;
  label: string;
  Icon: React.ElementType;
}

const socialIconItems: SocialIconItem[] = [
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Twitter", Icon: Twitter },
];

const SocialIcons: React.FC = () => (
  <div className="flex -mx-2">
    {socialIconItems.map((item, index) => (
      <a
        key={index}
        href={item.href}
        className="mx-2 text-gray-400 transition-colors duration-300 hover:text-gray-500"
        aria-label={item.label}
      >
        <item.Icon className="size-5" />
      </a>
    ))}
  </div>
);

// ContactInfo Component
const ContactInfo: React.FC = () => (
  <div className="text-center lg:text-right">
    <p className="font-semibold text-gray-800">Contact Us</p>
    <div className="flex flex-col items-center lg:items-end mt-5 space-y-2">
      <p className="text-gray-600">1234 Bike Lane</p>
      <p className="text-gray-600">BikeBazar, CV 12345</p>
      <p className="text-gray-600">+880 11223-34455</p>
      <p className="text-gray-600">info@bikestore.com</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Footer Component
// ─────────────────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Who We Are", href: "#" },
    { label: "Our Philosophy", href: "#" },
  ];

  const branchesLinks = [
    { label: "Cox's Bazar", href: "#" },
    { label: "Chittagong", href: "#" },
    { label: "Dhaka", href: "#" },
  ];

  return (
    <footer className="bg-neutral-200/65 py-14">
      <div className="container max-w-screen-2xl px-4 lg:px-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-y-10 lg:grid-cols-5">
          {/* Newsletter Section (spans two columns on small screens) */}
          <div className="sm:hidden lg:block lg:col-span-2">
            <NewsletterSubscription />
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-right">
            <p className="font-semibold text-gray-800">Quick Link</p>
            <FooterLinkList links={quickLinks} />
          </div>

          {/* Branches */}
          <div className="text-center lg:text-right">
            <p className="font-semibold text-gray-800">Branches</p>
            <FooterLinkList links={branchesLinks} />
          </div>

          {/* Contact/Address */}
          <ContactInfo />
        </div>

        <hr className="my-6 border-neutral-400/50 md:my-8" />

        <div className="flex items-center justify-between">
          <a className="flex items-center" href="#">
            <h1 className="font-black text-2xl">BikeStore</h1>
          </a>
          <div className="hidden sm:block lg:hidden">
            <NewsletterSubscription />
          </div>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
