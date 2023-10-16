/** @jsx jsx */
import { jsx, keyframes, css } from '@emotion/core';
import { Button } from './icons';

const backgroundAnimation = keyframes`
  {
    0% {
      left: -20px;
      top: -12px;
    }
    100% {
      left: -80px;
      top: -100px;
    }
  }
`;

const spin3 = keyframes`
    0%  {transform: rotate(0deg);}
    60%  {transform: rotate(165deg);}
    70%  {transform: rotate(42deg);}
    100%{transform: rotate(360deg);}
`;

export const SpinnerBase = (props) => (
  <div
    css={css`
      background-color: transparent;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: solid 2px #fff;
      position: absolute;
      top: 20px;
      left: 20px;
      animation: ${spin3} 2s linear infinite;
      z-index: 99;
      &:after {
        content: '';
        position: absolute;
        width: 2px;
        height: 2px;
        z-index: 999;
        background-color: #0d0a31;
        border-radius: 50%;
        border: solid 2px #fff;
      }
    `}
    {...props}
  />
);

export const SpinnerOuter = ({ children }) => (
  <div
    css={css`
      border-radius: 50%;
      width: 50px;
      height: 50px;
      overflow: hidden;
      margin: 0 auto;
      position: relative;
      padding-top: 5px;
    `}
  >
    {children}
  </div>
);

export const SpinnerInner = () => (
  <div
    css={css`
      background-image: linear-gradient(
        to top,
        hsl(340, 100%, 80%) 0%,
        #330867 100%
      );
      width: 300%;
      height: 200px;
      animation: ${backgroundAnimation} 4s linear infinite;
      animation-direction: alternate;
      position: relative;
      top: -50px;
      left: -50px;
      transition: all 03s ease;
      &:hover {
        background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
      }
    `}
  />
);

const SpecialButton = (props) => {
  return (
    <Button
      {...props}
      css={css`
        :focus {
          color: transparent;
        }
      `}
    >
      <SpinnerOuter>
        <SpinnerInner />
      </SpinnerOuter>
    </Button>
  );
};

export default SpecialButton;
