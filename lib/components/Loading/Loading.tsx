import { useInterval } from '@/lib/hooks';
import styles from './Loading.module.css';
import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  size: 'sm' | 'lg';
};

const money = '₡₪₳₷₶₯₰₣₫৳฿$€¥¢£₽₭₸૱'.split('');

const Loading = ({ size = 'sm' }: Props) => {
  const [item, setItem] = useState(money[0]);
  useInterval(() => {
    const currentIndex = money.indexOf(item);
    const nextIndex = (currentIndex + 1) % money.length;
    setItem(money[nextIndex]);
  }, 100);
  return (
    <div className={clsx(styles.root, styles[size])}>
      <span>{item}</span>
    </div>
  );
};

export default Loading;
