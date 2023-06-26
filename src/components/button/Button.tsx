import "./Button.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  fit?: boolean;
}

export default function Button(props: ButtonProps) {
  let className: string = "Button selectable";
  if(props.fit) className += " fit";
  return (
    <div className={className} onClick={props.onClick}>
      {props.title}
    </div>
  );
}
