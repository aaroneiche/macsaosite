import Markdown from "react-markdown";
import intro from '../../public/intro.md';

export default function Intro() {
  return (
    <div className="window">
      <div className="title-bar">
        <button aria-label="Close" className="close"></button>
        <h1 className="title">Getting Started</h1>
        <button aria-label="Resize" className="resize"></button>
      </div>
      <div className="separator"></div>

      <div className="window-pane" id="intro">
        <Markdown>
            {intro}
        </Markdown>
      </div>
    </div>
  );
}
