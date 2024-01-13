import Button from "../button/Button";
import { appWindow } from '@tauri-apps/api/window';
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";

export default function Titlebar() {
  return (
    <TopBar
      tauriDrag
      size={TopBarSize.LARGE}
      float={TopBarFloat.RIGHT}
    >
        <Button title="_" onClick={() => {appWindow.minimize()}}/>
        <Button title="▢" onClick={() => {appWindow.toggleMaximize()}}/>
        <Button title="X" onClick={() => {appWindow.close()}}/>
    </TopBar>
  );
}
