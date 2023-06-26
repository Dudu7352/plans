import { useEffect, useRef, useState } from "react";
import "./EventPrompt.css";
import Button from "../../components/button/Button";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import EventInput from "../event_input/EventInput";
import { EventDetails } from "../../utils/interfaces";

interface EventPromptProps {
  date: Date;
  isOpened: boolean,
  close: () => void,
}

export default function EventPrompt(props: EventPromptProps) {
  let ref = useRef<HTMLDialogElement>(null);
  let [eventDetails, setEventDetails] = useState({} as EventDetails);


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
      <TopBar size={TopBarSize.FIT} float={TopBarFloat.LEFT} rounded={true}>
        <h3>Add new event</h3>
      </TopBar>
      
      <EventInput 
        eventDetails={eventDetails} 
        updateEventDetails={ eventDetails => {
          if(eventDetails.duration_seconds < 0 || eventDetails.name == "")
            return;
          setEventDetails(eventDetails);
        }}
      />

      <div className="control-bar">
        <Button onClick={props.close} title="Cancel"/>
        <Button onClick={() => {}} title="Add"/>
      </div>
    </dialog>
  );
}
