import { useState } from "react";
import { byte, parseByteSequence } from "../commandBytes";

export function PasteImport(props: {
  setBytes: React.Dispatch<React.SetStateAction<byte[]>>;
}) {
  const [pasteValue, setPasteValue] = useState("");
  const [error, setError] = useState("");

  const loadBytes = () => {
    try {
      const parsed = parseByteSequence(pasteValue);
      setError("");
      props.setBytes(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not parse bytes.");
    }
  };

  return (
    <div id="pasteImport">
      <label htmlFor="pasteBytesInput">Paste Bytes: </label>
      <div>
        <textarea
          id="pasteBytesInput"
          className="byteTextArea"
          placeholder="e.g. 1 1 254 16 34 38 22 3 4 255"
          value={pasteValue}
          onChange={(e) => setPasteValue(e.target.value)}
        />
      </div>
      <button onClick={loadBytes}>Load Bytes</button>
      {error.length !== 0 && (
        <div style={{ color: "red" }}>{error}</div>
      )}
    </div>
  );
}
