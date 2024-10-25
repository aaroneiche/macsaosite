import { useDroppable } from "@dnd-kit/core";

function Droppable(props: { children: React.ReactElement[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    height: "500px",
    width: "1000px",
    border: "solid black 1px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export {Droppable}