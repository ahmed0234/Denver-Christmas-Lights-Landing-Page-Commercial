import Image from "next/image";

/** Round badge logo used in the header and footer; size is set in CSS. */
export default function BrandLogo({ eager = false }: { eager?: boolean }) {
  return (
    <Image
      className="brand-logo"
      src="/NewLogo.png"
      alt=""
      width={84}
      height={84}
      sizes="84px"
      loading={eager ? "eager" : "lazy"}
    />
  );
}
