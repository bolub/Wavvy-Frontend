import * as React from 'react';

const Microphone: React.FC = (props) => {
  return (
    <svg
      width={19}
      height={28}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x={2}
        y={2}
        width={15}
        height={20}
        rx={7}
        stroke='#F2F2F2'
        strokeWidth={3}
        strokeLinejoin='round'
      />
      <path
        d='M9.7 25.75V22M6.6 14.5H2.85M16.2 14.5h-2.5M6.2 9.5H2.45M16.2 9.5h-2.5'
        stroke='#F2F2F2'
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Microphone;
