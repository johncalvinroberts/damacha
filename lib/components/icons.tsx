import React from 'react';

type Props = React.SVGAttributes<HTMLOrSVGElement> & { size?: number };

const SVG = ({ size = 24, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentcolor"
    {...props}
  />
);

export const Play = (props: Props) => (
  <SVG {...props}>
    <path d="M8 5v14l11-7z" />
  </SVG>
);

export const Pause = (props: Props) => (
  <SVG {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </SVG>
);

export const Previous = (props: Props) => (
  <SVG {...props}>
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </SVG>
);

export const Next = (props: Props) => (
  <SVG {...props}>
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </SVG>
);

export const Dot = (props: Props) => (
  <SVG {...props} viewBox="0 0 32 32">
    <circle
      cx="16"
      cy="16"
      r="14"
      fill="none"
      stroke="currentcolor"
      strokeWidth="4"
    />
    <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
  </SVG>
);
