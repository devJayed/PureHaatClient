import Logo from "@/assets/svgs/Logo";
import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo + Description */}
        <div className="flex flex-col items-center mb-6">
          <Logo />

          <p className="text-gray-600 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            <span className="font-bold text-purple-700">PureHaat</span> একটি
            দেশীয় খাদ্যপণ্যের অনলাইন বিক্রয় কেন্দ্র। <br />
            আমরা গ্রাম ও চরাঞ্চলে প্রাকৃতিকভাবে বেড়ে ওঠা 
            <span className="font-semibold text-purple-700">
              দেশীয় হাস-মুরগি 
            </span>
            , <span className="font-semibold text-purple-700">গরুর দুধ</span>, 
            <span className="font-semibold text-purple-700">
                ঘানি ভাঙা সরিষার তেল 
            </span>
            , <span className="font-semibold text-purple-700">ঘি</span>,  
            <span className="font-semibold text-purple-700">মধু </span> ও
            <span className="font-semibold text-purple-700"> মসলা </span>সহ সব
            ধরণের খাদ্য পণ্য বিক্রয় করি।
            <br />
            <span className="font-bold text-purple-800">
              বিশুদ্ধতা, সততা এবং স্বচ্ছতা আমাদের অঙ্গীকার।
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <hr className="my-6 w-3/4 border-gray-300" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-800 font-medium mb-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
