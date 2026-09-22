"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, CSSProperties } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  style?: CSSProperties;
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>((props, ref) => {
  const { children, className = "", as: Element = "div", delay = 0, style } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => elementRef.current!, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return React.createElement(Element, { ref: elementRef, className: `reveal ${className}`, style: { transitionDelay: `${delay}ms`, ...style } }, children);
});
Reveal.displayName = "Reveal";