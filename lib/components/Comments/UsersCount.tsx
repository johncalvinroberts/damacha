'use client';

import { useOthers } from '@/liveblocks.config';
import styles from './Comments.module.css';

export function UsersCount() {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div className={styles.usersCount}>
      There are {userCount} other user(s) listening
    </div>
  );
}
