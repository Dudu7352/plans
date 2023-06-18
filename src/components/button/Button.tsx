import "./Button.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <div className="Button selectable" onClick={props.onClick}>
      {props.title}
    </div>
  );
}
