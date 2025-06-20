import React from 'react';

interface UpdatedTimeProps {
  date: string; // ISO string like "2025-06-19T20:49:42.390Z"
}

const UpdatedTime: React.FC<UpdatedTimeProps> = ({ date }) => {
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const parts = formatter.formatToParts(parsedDate);

  const day = parts.find(p => p.type === 'day')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const hour = parts.find(p => p.type === 'hour')?.value;
  const minute = parts.find(p => p.type === 'minute')?.value;

  if (!day || !month || !hour || !minute) return null;

  return (
    <span className="text-sm text-gray-500">
      Updated {day} {month}, {hour}:{minute}
    </span>
  );
};

export default UpdatedTime;
