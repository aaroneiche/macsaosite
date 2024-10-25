import {page} from "../Layout"

export default function Navigation(props: {
  setPage: React.Dispatch<React.SetStateAction<page>>;
}) {
  return (
    <div>
      <button onClick={() => props.setPage("intro")}>Getting Started</button>
      <button onClick={() => props.setPage("bytebuilder")}>Byte Builder</button>
      <button onClick={() => props.setPage("reference")}>Reference</button>
    </div>
  );
}