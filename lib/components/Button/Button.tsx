import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  children: React.ReactNode;
};

const Button = ({ title, children, className, ...props }: ButtonProps) => (
  <button {...props} title={title} className={clsx(styles.root, className)}>
    {children}
    <span className={styles.piece}>{title}</span>
  </button>
);
export default Button;
