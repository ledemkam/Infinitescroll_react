import { Todo } from "../types";

export type TodoCardProps = {
  todo: Todo;
  innerRef?: React.Ref<HTMLParagraphElement>;
};

export const TodoCard = ({ todo, innerRef, ...props }: TodoCardProps) => {
  return (
    <p
      className="bg-[#a520c6] p-4 text-3xl"
      key={todo.id}
      ref={innerRef}
      {...props}
    >
      {todo.title}
    </p>
  );
};
