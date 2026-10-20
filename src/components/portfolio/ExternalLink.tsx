import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  href: string;
  children: ReactNode;
};

/**
 * Single source of truth for outbound links (LinkedIn, GitHub, mailto, tel, project URLs).
 *
 * Guarantees:
 * - Always opens http(s) links in a new tab via window.open, bypassing iframe/preview navigation issues.
 * - Always applies target="_blank" + rel="noopener noreferrer" as a fallback.
 * - Leaves mailto: and tel: links to the browser's default handler (no new tab).
 */
const ExternalLinkComponent = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ href, onClick, children, ...rest }, ref) => {
    const isProtocolLink = href.startsWith("mailto:") || href.startsWith("tel:");

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isProtocolLink) return;
      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        target={isProtocolLink ? undefined : "_blank"}
        rel={isProtocolLink ? undefined : "noopener noreferrer"}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

ExternalLinkComponent.displayName = "ExternalLink";

export default ExternalLinkComponent;