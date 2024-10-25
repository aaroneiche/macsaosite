import { useDraggable } from "@dnd-kit/core";

function Draggable(props: {children:React.ReactElement[]}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        height:"50px",
        width: "50px",
        backgroundColor: "blue",
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
export {Draggable}