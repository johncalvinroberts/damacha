'use client';

type Props = {
  date: Date | string;
};

const formatDate = (date: Date | string) => {
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } as const;
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(date),
  );
  return formattedDate;
};
const NiceDate = ({ date }: Props) => {
  const formatted = formatDate(new Date(date));
  return <>{formatted}</>;
};

export default NiceDate;
