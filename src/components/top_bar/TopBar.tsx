import "./TopBar.css";

export enum TopBarSize {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  FIT = "fit",
}

export enum TopBarFloat {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

interface TopBarProps {
  size: TopBarSize;
  float: TopBarFloat;
  rounded?: boolean;
  className?: string;
  children?: React.ReactElement | React.ReactElement[];
}

export default function TopBar(props: TopBarProps) {
  let className: string = `TopBar bar ${props.size} ${props.float} ${props.className}`;
  if(props.rounded) className += " rounded";
  return <div className={className}>{props.children}</div>;
}
