import { useEffect, useRef } from "react";
import "./Dialog.css";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";

interface DialogProps {
  isOpened: boolean;
  title: string;
  children?: React.ReactElement | React.ReactElement[];
}

export default function Dialog(props: DialogProps) {
  let ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpened && !ref.current?.hidden) ref.current?.showModal();
    else ref.current?.close();
  }, [props.isOpened]);

  return (
    <dialog className="Dialog root-box bordered" ref={ref}>
      <TopBar size={TopBarSize.FIT} float={TopBarFloat.LEFT} rounded={true}>
        <h3>{props.title}</h3>
      </TopBar>
      {props.children}
    </dialog>
  );
}
