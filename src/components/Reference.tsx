// import Markdown from "react-markdown";
// import reference from "../../public/reference.md";
// import remarkGfm from "remark-gfm";
import { lookupTable, lookupByte, controlTable } from "../commandBytes"
import "./Reference.css"

function ReferenceBlock(command: number, byteInfo: lookupByte) {
    
    const theseArgs = (typeof byteInfo.args !== 'function') ? byteInfo.args.map(a=>{return <div>{a}</div>}) : "It's complicated";

    return (
        <div className="window" id={byteInfo.name.replace(" ","_")}>
        <div className="title-bar">
          <button aria-label="Close" className="close"></button>
          <h1 className="title">{byteInfo.name}</h1>
          <button aria-label="Resize" className="resize"></button>
        </div>
        <div className="separator"></div>

        <div className="window-pane">
            <table>
                <tr>
                    <th>Byte</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>{command}</td>
                    <td>{byteInfo.desc}</td>   
                </tr>    
                <tr><td>&nbsp;</td></tr>
                <tr>
                    {byteInfo.args.length > 0 &&
                        <>
                        <td className="argsTitle"> <b>Args:</b>  </td>
                        <td> {theseArgs} </td>
                        </>
                    }
                    
                </tr>
            </table>    
        </div>
      </div>
    )
}



export function Reference() {

    const toc = Object.keys(lookupTable).map((k) => (
      <a href={"#" + lookupTable[Number(k)].name.replace(" ", "_")}>
        {lookupTable[Number(k)].name}
      </a>
    ));

    const controltoc = Object.keys(controlTable).map((k) => (
        <a href={"#" + controlTable[Number(k)].name.replace(" ", "_")}>
        {controlTable[Number(k)].name}
        </a>
    ));

    const refSet = Object.keys(lookupTable).map(k=>{
        return ReferenceBlock(Number(k), lookupTable[Number(k)]);
    });


    const controlRefSet = Object.keys(controlTable).map((k) => {
        return ReferenceBlock(Number(k), controlTable[Number(k)]);
    });


    return (
      <>
        <h2>Contents: </h2>
        <div id="toc">
          <table>
            <tr>
              <th>
                Drawing
              </th>
              <th>
                Control
              </th>
            </tr>

            <tr>
              <td>{toc}</td>
              <td>{controltoc}</td>
            </tr>
          </table>
        </div>

        <h2>Drawing commands</h2>
        {refSet}
        <hr />
        <h2>Control commands</h2>
        {controlRefSet}
      </>
    );

}
