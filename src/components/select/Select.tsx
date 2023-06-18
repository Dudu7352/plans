import "./Select.css";

interface SelectProps {
  values: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: SelectProps) {
  return (
    <select className="Select selectable" onChange={props.onChange}>
      {props.values.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
