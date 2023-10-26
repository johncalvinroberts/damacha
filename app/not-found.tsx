import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div style={{ padding: '10px' }}>
      <p>
        The track you are seeking has been removed, maybe it was never here at
        all.
      </p>
      <Link href="/">home</Link>
    </div>
  );
};

export default NotFound;
