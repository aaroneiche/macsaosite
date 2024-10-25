import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


import { byte, byteArg} from '../commandBytes';

type SortableItemProps = {
  key: number;
  id: number;
  name: string;
  command: number;
  args: byteArg[] | ((byteId: number, bytesData: byte[], setBytes:React.Dispatch<React.SetStateAction<byte[]>>) => React.ReactElement);
  currentAddress: number,
  bytes: byte[];
  setBytes: React.Dispatch<React.SetStateAction<byte[]>>

}

export function SortableItem(props: SortableItemProps ) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formArgs = (()=>{
    if(typeof props.args !== 'function') { //lookupTable[Number(props.command)]
      return  props.args.map((a: byteArg) => (
        <div className={"argPair"}>
          <label htmlFor="">{a.arg}</label>
          <input
            type="text"
            size={2}
            value={a.val}
            onChange={(e) => {
              updateArg(props.id, a.arg, e.target.value);
            }}
          />
        </div>
      ))
    }else{
      return (props.args)(props.id, props.bytes,props.setBytes);
    }

  })();

  /* 
  Updates an arg value for the provided byte.
  */
  const updateArg = (byteId: number, arg: string, value: string) => {
    const updated = [...(props.bytes)];
    
    //This feels convoluted, but we're dancing to make Typescript happy.
    const thisByte = updated.find((k) => k.id == byteId);
    if(thisByte && typeof thisByte.args !== 'function') {
      const thisArg = thisByte.args.find((a:byteArg) => a.arg === arg);
      if(thisArg) thisArg.val = value;
    }
    props.setBytes(updated);
  };

  const removeByte = (id: number) => {
    const updatedBytes = [...(props.bytes)];
    updatedBytes.splice(
      updatedBytes.findIndex((k) => k.id == id),
      1
    );

    props.setBytes(updatedBytes);
  };


  return (
    <div className={"tile"} ref={setNodeRef} style={style}>
      <div className={"address"}>
        0x
        {Number(props.currentAddress)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}
      </div>
      <div className="title" {...attributes} {...listeners}>
        {props.name}
      </div>
      {formArgs}
      <div className="byteFooter">
        <button>?</button>
        <button
          onClick={() => {
            // console.log("yes?");
            removeByte(props.id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
