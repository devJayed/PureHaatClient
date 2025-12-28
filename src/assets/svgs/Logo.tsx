import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/pureHaatLogo.jpg"
      alt="Company Logo"
      width={70}
      height={50}
      className="object-contain"
      priority
    />
  );
}
