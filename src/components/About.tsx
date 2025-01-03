import Markdown from "react-markdown";
import about from "../assets/about.md";
import rehypeRaw from "rehype-raw";

export default function About() {
  return (
    <div className="window">
      <div className="title-bar">
        <button aria-label="Close" className="close"></button>
        <h1 className="title">Welcome</h1>
        <button aria-label="Resize" className="resize"></button>
      </div>
      <div className="separator"></div>

      <div className="modeless-dialog" id="intro">
        <Markdown rehypePlugins={[rehypeRaw]}>{about}</Markdown>
      </div>
    </div>
  );
}
