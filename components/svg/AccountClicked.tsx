import React, { FC } from "react";

type AccountProps = {
  onClick: () => void;
};

export const AccountClicked: FC<AccountProps> = ({ onClick }) => {
  return (
    <div className="accountCard" onClick={onClick}>
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="27"
          height="27"
        >
          <circle cx="13.5" cy="13.5" r="13.5" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="13.5" cy="10.5" r="6" fill="#19243B" />
          <circle cx="13.125" cy="25.875" r="9.375" fill="#19243B" />
        </g>
        <circle
          cx="13.5"
          cy="13.5"
          r="12.75"
          stroke="#19243B"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
