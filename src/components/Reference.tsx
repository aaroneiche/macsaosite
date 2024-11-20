// import Markdown from "react-markdown";
// import reference from "../../public/reference.md";
// import remarkGfm from "remark-gfm";

import { lookupTable, lookupByte, controlTable } from "../commandBytes"
import "./Reference.css"

function ReferenceBlock(command: number, byteInfo: lookupByte) {
    
    const theseArgs = (typeof byteInfo.args !== 'function') ? byteInfo.args.map(a=>{return <div>{a}</div>}) : "It's complicated";


    // import thisImage from byteInfo.image;


    return (
      <div
        className="window"
        id={byteInfo.name.replace(" ", "_")}
        key={byteInfo.name.replace(" ", "_")}
      >
        <div className="title-bar">
          <button aria-label="Close" className="close"></button>
          <h1 className="title">{byteInfo.name}</h1>
          <button aria-label="Resize" className="resize"></button>
        </div>
        <div className="separator"></div>

        <div className={["window-pane", "reference-block"].join(" ")}>
          <table>
            <thead>
              <tr>
                <th>Byte</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{command}</td>
                <td>{byteInfo.desc}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                {byteInfo.args.length > 0 && (
                  <>
                    <td className="argsTitle">
                      {" "}
                      <b>Args:</b>{" "}
                    </td>
                    <td> {theseArgs} </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
          {byteInfo.image !== undefined && (
            <img src={`public/${byteInfo.image}`} style={{ height: "100px" }} />
          )}
        </div>
      </div>
    );
}



export function Reference() {

    // Drawing commands Table of contents
    const toc = Object.keys(lookupTable).map((k) => (
      <a href={"#" + lookupTable[Number(k)].name.replace(" ", "_")}>
        {lookupTable[Number(k)].name}
      </a>
    ));

    // Control Commands Table of contents
    const controltoc = Object.keys(controlTable).map((k) => (
        <a href={"#" + controlTable[Number(k)].name.replace(" ", "_")}>
        {controlTable[Number(k)].name}
        </a>
    ));

    // Reference blocks
    const refSet = Object.keys(lookupTable).map(k=>{
        return ReferenceBlock(Number(k), lookupTable[Number(k)]);
    });

    // Control blocks
    const controlRefSet = Object.keys(controlTable).map((k) => {
        return ReferenceBlock(Number(k), controlTable[Number(k)]);
    });


    return (
      <>
        <h2>Contents: </h2>
        <div id="toc">
          <table>
            <tr>
              <th>Drawing</th>
              <th>Control</th>
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
        <h2>Settings Key:</h2>

        <div className="window" id="settings">
          <div className="title-bar">
            <button aria-label="Close" className="close"></button>
            <h1 className="title">Settings Key</h1>
            <button aria-label="Resize" className="resize"></button>
          </div>
          <div className="separator"></div>

          <div className="window-pane">
            <p>
              The first 16 bytes of the EEPROM are reserved for settings. 
              Avoid writing to them directly.
            </p>
            <table border={1} cellPadding="10px">
              <tr>
                <th>0x0000</th>
                <th>0x0001</th>
                <th>0x0002</th>
                <th>0x0003</th>
                <th>0x0004-000F</th>
              </tr>
              <tr>
                <td>Selected I2C address</td>
                <td>Sequence Address High Byte</td>
                <td>Sequence Address Low Byte</td>
                <td>Sequence Length</td>
                <td>
                  <i>currently not used</i>
                </td>
              </tr>
              <tr>
                <td>
                  <i>defaults to 10(0x0A)</i>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </>
    );

}
