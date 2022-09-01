import React, { FC } from 'react';

const ChevronDown: FC = (props) => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M9 11.25L8.64645 11.6036L9 11.9571L9.35355 11.6036L9 11.25ZM4.14645 7.10355L8.64645 11.6036L9.35355 10.8964L4.85355 6.39645L4.14645 7.10355ZM9.35355 11.6036L13.8536 7.10355L13.1464 6.39645L8.64645 10.8964L9.35355 11.6036Z'
        fill='#222222'
      />
    </svg>
  );
};

export default ChevronDown;
