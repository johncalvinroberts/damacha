'use client';
import { useState } from 'react';
import { UsersCount } from './UsersCount';
import styles from './Comments.module.css';
import Button from '../Button';
import { Chat } from '../icons';

const Comments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <div className={styles.root}>
      <UsersCount />
      {/* <Button
        title="start to chat"
        className={styles.chatButton}
        onClick={handleClick}
      >
        <Chat size={40} />
      </Button> */}
    </div>
  );
};

export default Comments;
