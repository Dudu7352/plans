interface TableInputProps {
    label: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableInput(props: TableInputProps) {
    return (
        <tr>
          <td>{props.label}</td>
          <td>
            <input
              type={props.type}
              className="selectable bordered"
              onChange={props.onChange}
            />
          </td>
        </tr>
    )
}