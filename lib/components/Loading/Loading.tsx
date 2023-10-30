import { useInterval } from '@/lib/hooks';
import styles from './Loading.module.css';
import { useState } from 'react';
import clsx from 'clsx';
import { getRandomUnicodeString } from '@/lib/utils';

type Props = {
  size: 'sm' | 'lg';
};

const Loading = ({ size = 'sm' }: Props) => {
  const [item, setItem] = useState(getRandomUnicodeString(1));

  useInterval(() => {
    getRandomUnicodeString(1);
    setItem(getRandomUnicodeString(1));
  }, 100);

  return (
    <div className={clsx(styles.root, styles[size])}>
      <span>{item}</span>
    </div>
  );
};

export default Loading;
