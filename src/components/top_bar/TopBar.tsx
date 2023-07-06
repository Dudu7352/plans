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
  tauriDrag?: boolean;
}

export default function TopBar(props: TopBarProps) {
  let className: string = `TopBar bar ${props.size} ${props.float} ${props.className}`;
  if (props.rounded) className += " rounded";
  return (
    <div className={className} data-tauri-drag-region={props.tauriDrag}>
      {props.children}
    </div>
  );
}
