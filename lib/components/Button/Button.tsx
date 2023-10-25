import styles from './Button.module.css';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  children: React.ReactNode;
};

const Button = ({ title, children, ...props }: ButtonProps) => (
  <button {...props} title={title} className={styles.root}>
    {children}
    <span className={styles.piece}>{title}</span>
  </button>
);
export default Button;
