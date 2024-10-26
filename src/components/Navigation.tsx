import {page} from "../Layout"

export default function Navigation(props: {
    currentPage: string,
    setPage: React.Dispatch<React.SetStateAction<page>>;
}) {
  return (
    <div>
      <button className={(props.currentPage === 'intro')? 'selected':''} onClick={() => props.setPage("intro")}>Getting Started</button>
      <button className={(props.currentPage === 'bytebuilder')? 'selected':''}  onClick={() => props.setPage("bytebuilder")}>Byte Builder</button>
      <button className={(props.currentPage === 'reference')? 'selected':''}  onClick={() => props.setPage("reference")}>Reference</button>
    </div>
  );
}