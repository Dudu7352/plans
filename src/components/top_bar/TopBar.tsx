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
  className?: string;
  children?: React.ReactElement | React.ReactElement[];
}

export default function TopBar(props: TopBarProps) {
  let className: string = `TopBar child-box box ${props.size} ${props.float} ${props.className}`;
  return <div className={className}>{props.children}</div>;
}
