import * as React from "react";
import { SVGProps } from "react";

interface DoctorsIconProps extends SVGProps<SVGSVGElement> {
  hovered: boolean;
  selected: boolean;
}

const DoctorsIcon: React.FC<DoctorsIconProps> = ({selected, hovered, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={30} viewBox="0 0 50 75" {...props}>
    <path
      fill={hovered || selected ? "#fff" : "#2C297E"}
      d="M24 44h20v10c-2.438 2.063-2.438 2.063-5 3-1.286 1.06-1.286 1.06-1.098 3.504l.035 3.059.028 3.066L38 69h4l-1-3c-.188-3.563-.188-3.563 0-7l2-2c3.563.25 3.563.25 7 1 1.373 2.746 1.124 4.959 1 8l-1 3h4c.082-1.582.14-3.166.188-4.75l.105-2.672C53.943 58.495 53.14 57.215 51 55l-3-1v-9c6.399 1.6 11.766 4.825 15.586 10.254C67.026 61.287 68.39 65.974 68 73c-2 2-2 2-4.701 2.247l-3.477-.004-3.933.01-4.268-.023h-4.356c-3.044-.002-6.088-.01-9.132-.024-3.91-.017-7.82-.021-11.73-.02-2.998 0-5.996-.006-8.994-.013a2544.15 2544.15 0 0 0-4.327-.006c-2.01-.002-4.022-.012-6.033-.022l-3.475-.011C1 75 1 75 0 74c-1.086-7.68.61-13.67 5-20 4.384-4.961 8.489-7.78 15-9v10l-4 2c-1.42 2.84-1.315 4.855-1 8 1.417 2.583 1.417 2.583 4 4 3.812 0 6.051-.2 9-2.688 1.39-3.212 1.055-5.006 0-8.312l-2.043-1.328C24 55 24 55 23.609 52.3L24 44Z"
    />
    <path
      fill={hovered || selected ? "#fff" : "#2B297E"}
      d="M42.469.96C47.422 3.863 51.156 7.47 53 13c.878 7.402.55 13.135-4.102 19.152-4.378 4.262-9.419 6.004-15.46 6.348-5.46-.286-9.963-2.207-13.977-5.926-4.464-5.052-5.97-9.617-5.762-16.238.778-6.044 3.478-10.1 8.239-13.836 6.267-3.775 13.71-4.194 20.53-1.54Z"
    />
    <path
      fill={hovered || selected ? "#fff" : "#2C297E"}
      d="M20 58c2.625.375 2.625.375 5 1 .625 2.375.625 2.375 1 5l-2 2c-3.125-.375-3.125-.375-6-1-.125-2.375-.125-2.375 0-5l2-2Z"
    />
  </svg>
);

export default DoctorsIcon;
