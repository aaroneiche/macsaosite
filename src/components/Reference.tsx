// import Markdown from "react-markdown";
// import reference from "../../public/reference.md";
// import remarkGfm from "remark-gfm";
import { lookupTable, byte, lookupByte } from "../commandBytes"
import "./Reference.css"

function ReferenceBlock(command: number, byteInfo: lookupByte) {
    
    const theseArgs = (typeof byteInfo.args !== 'function') ? byteInfo.args.map(a=>{return <div>{a}</div>}) : "It's complicated";

    return (
        <div className="window">
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
//  return <Markdown remarkPlugins={[remarkGfm]}>{reference}</Markdown>; 

    // const referenceSet = lookupTable.map(b=> ReferenceBlock()) 

    const refSet = Object.keys(lookupTable).map(k=>{
        return ReferenceBlock(Number(k), lookupTable[Number(k)]);
    });


    return refSet;

}
