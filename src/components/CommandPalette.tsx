import { byte, lookupTable } from "../commandBytes";


//React.Dispatch<React.SetStateAction<byte[]>>) => React.ReactElement

export function CommandPalette(props: {
  bytes: byte[];
  setBytes: React.Dispatch<React.SetStateAction<byte[]>>;
}) {
  const addThisByte = (byteIndex: keyof typeof lookupTable) => {
    const newByte: byte = {
      id: props.bytes.length + 1,
      command: Number(byteIndex),
      name: lookupTable[Number(byteIndex)].name,
      args: [],
    };

    if (Array.isArray(lookupTable[byteIndex].args)) {
      const argSet = lookupTable[byteIndex].args.map((a: string) => {
        return {
          arg: a,
          val: "",
        };
      });
      newByte["args"] = argSet;
    } else {
      //I think this will work abstractly.
      newByte["args"] = lookupTable[byteIndex].args.builder; //This is a function.
      newByte["value"] = "";
      newByte["out"] = lookupTable[byteIndex].out;
    }

    props.setBytes([...props.bytes, newByte]);
  };

  const newByteButtons = Object.keys(lookupTable).map((op) => {
    return (
      <button onClick={() => addThisByte(Number(op))}>
        {lookupTable[Number(op)].name}
      </button>
    );
  });

  return (
    <div>
        <div style={{textAlign:"left"}}>Add Byte</div>
        <div className={"buttonGrid"}>{newByteButtons}</div>
    </div>
  );
}