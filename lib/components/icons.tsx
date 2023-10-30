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

export const Chat = (props: Props) => (
  <SVG {...props} viewBox="0 0 15 15">
    <path
      fill="currentColor"
      d="m11.5 13.5l.157-.475l-.218-.072l-.197.119l.258.428Zm2-2l-.421-.27l-.129.202l.076.226l.474-.158Zm1 2.99l-.157.476a.5.5 0 0 0 .631-.634l-.474.159Zm-3.258-1.418c-.956.575-2.485.919-3.742.919v1c1.385 0 3.106-.37 4.258-1.063l-.516-.856ZM7.5 13.99c-3.59 0-6.5-2.909-6.5-6.496H0a7.498 7.498 0 0 0 7.5 7.496v-1ZM1 7.495A6.498 6.498 0 0 1 7.5 1V0A7.498 7.498 0 0 0 0 7.495h1ZM7.5 1C11.09 1 14 3.908 14 7.495h1A7.498 7.498 0 0 0 7.5 0v1ZM14 7.495c0 1.331-.296 2.758-.921 3.735l.842.54C14.686 10.575 15 8.937 15 7.495h-1Zm-2.657 6.48l3 .99l.314-.949l-3-.99l-.314.949Zm3.631.357l-1-2.99l-.948.316l1 2.991l.948-.317Z"
    />
  </SVG>
);
