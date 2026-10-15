import { MouseEvent, ReactNode } from 'react';
import { Language, Tab } from '../types';
import { pathFor } from '../router';

interface LinkProps {
  tab: Tab;
  lang: Language;
  navigate: (tab: Tab) => void;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Internal link: a real <a href> (crawlable, shareable, works without JS)
 * that upgrades to a client-side navigation on a plain left click.
 */
export default function Link({ tab, lang, navigate, className, children, ariaLabel }: LinkProps) {
  const href = pathFor(tab, lang);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(tab);
  };
  return (
    <a href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
