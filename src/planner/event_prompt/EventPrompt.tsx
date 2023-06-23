import { useEffect, useRef } from "react";
import "./EventPrompt.css";
import Button from "../../components/button/Button";

interface EventPromptProps {
  isOpened: boolean,
  close: () => void,
}

export default function EventPrompt(props: EventPromptProps) {
  let ref = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if(props.isOpened && !ref.current?.hidden)
      ref.current?.showModal();
    else
      ref.current?.close();
  }, [props.isOpened]);

  return (
    <dialog
      className="root-box bordered"
      ref={ref}
    >
      <h3>Add new event</h3>
      <p>Event name</p>
      <input type="text" />

      <div className="control-bar">
        <Button onClick={props.close} title="Cancel"/>
        <Button onClick={() => {}} title="Add"/>
      </div>
    </dialog>
  );
}
