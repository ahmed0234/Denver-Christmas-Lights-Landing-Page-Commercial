"use client";

import { handleGetQuoteClick } from "@/lib/scrollUtils";
import type { ReactNode, CSSProperties, MouseEvent } from "react";

interface QuoteCTAButtonProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function QuoteCTAButton({
  id,
  className,
  style,
  children,
  ariaLabel,
  onClick,
}: QuoteCTAButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      handleGetQuoteClick(e);
    }
  };

  return (
    <a
      id={id}
      href="#quote"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
