import "./EventPrompt.css";

interface EventPromptProps {
  isShown: boolean,
}

export default function EventPrompt() {
  return (
    <dialog>
      <h3>Add new event</h3>
      <p>Event name</p>
      <input type="text" />
    </dialog>
  );
}
