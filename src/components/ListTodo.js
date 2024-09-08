import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "../Reducers/todoSlider";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";

const ListTodo = () => {
  const { todoList } = useSelector((state) => state.toDo);
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id: "",
    content: "",
    contentError: null,
  });

  const onEditToggle = (id, content) => {
    setEditing(true);
    setState({ ...state, id, content });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };

  const { content, contentError, id } = state;

  const edit = () => {
    if (content === "") {
      setState({ ...state, contentError: "You must write something!" });
      return;
    }
    dispatch(editTodo({ content, id }));
    setEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="form">
          <h2>Update your plan for today</h2>
          <input
            type="text"
            value={content}
            name="content"
            onChange={handleChange}
          ></input>
          <button type="button" className="button" onClick={edit}>
            Edit
          </button>
          {contentError ? <div className="error">{contentError}</div> : null}
        </div>
      ) : (
        <ul className="todos">
          {todoList.map(({ id, content }) => {
            return (
              <li className="grid" key={id}>
                <span className="content">{content}</span>
                <span className="todo-action">
                  <AiOutlineCloseCircle
                    className="close"
                    onClick={() => dispatch(deleteTodo({ id }))}
                  />
                  <AiFillEdit
                    className="edit"
                    onClick={() => onEditToggle(id, content)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default ListTodo;
