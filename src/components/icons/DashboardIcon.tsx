import * as React from "react";
import { SVGProps } from "react";
interface DashboardIconProps extends SVGProps<SVGSVGElement> {
  hovered: boolean;
  selected: boolean;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ selected, hovered, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={30} viewBox="0 0 60 80" {...props}>
    <path
      fill={hovered || selected ? "#fff": "#2B2A7E"}
      d="M4 0h30v75H4C-.411 70.589-.502 70.256-.518 64.459l-.02-1.963c-.018-2.134-.007-4.268.007-6.402-.003-1.487-.007-2.974-.012-4.46-.006-3.115.003-6.228.022-9.342.022-3.988.01-7.975-.015-11.964-.014-3.07-.01-6.138 0-9.208.003-1.47 0-2.94-.01-4.411-.01-2.057.006-4.112.028-6.168l.01-3.543C0 4 0 4 4 0Z"
    />
    <path
      fill={hovered || selected ? "#fff" : "#2C297D"}
      d="M41 37h34l.25 16.75.11 5.269c.012 1.384.022 2.768.03 4.153l.063 2.162c.002 3.29-.244 5.342-2.043 8.13-3.267 2.082-5.505 1.992-9.363 1.927l-3.661-.03-4.636-.111L41 75V37Z"
    />
    <path
      fill={hovered || selected ? "#fff" : "#2B297E"}
      d="m41 0 14.75-.25 4.636-.11 3.66-.03 3.746-.064C71 0 71 0 73.41 1.645c2.036 3.016 2.052 4.813 1.98 8.433l-.03 3.17-.11 4.002L75 30H41V0Z"
    />
  </svg>
);

export default DashboardIcon;
