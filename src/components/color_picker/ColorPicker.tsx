import ColorButton from "../color_button/ColorButton";
import "./ColorPicker.css";

interface ColorPickerProps {
  templateColors: string[];
  setColor: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
  console.log(props.templateColors);
  return (
    <div className="ColorPicker">
      {props.templateColors.map((color: string, i: number) => (
        <ColorButton
          key={i}
          color={color}
          onClick={() => {
            console.log(i);
            props.setColor(color);
          }}
        />
      ))}
    </div>
  );
}
