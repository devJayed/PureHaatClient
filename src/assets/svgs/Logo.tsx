import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/pureHaatLogo.jpg"
      alt="Company Logo"
      width={80}
      height={60}
      className="object-contain"
      priority
    />
  );
}
