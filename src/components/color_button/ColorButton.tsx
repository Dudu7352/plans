import "./ColorButton.css";

interface ColorButtonProps {
    color: string;
    onClick: () => void;
}

export default function ColorButton(props: ColorButtonProps) {
  return <div onClick={props.onClick} className="ColorButton" style={{backgroundColor: props.color}}></div>;
}
