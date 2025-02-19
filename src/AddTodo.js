import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./Reducers/todoSlider";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    content: "",
    contentError: null,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };

  const add = () => {
    if (content === "") {
      setState({ ...state, contentError: "You must write something!" });
      return;
    }
    dispatch(addTodo({ newContent: content }));
    setState({ ...state, content: "" });
  };

  const { content, contentError } = state;
  return (
    <div className="form">
      <h2>What's your plan for today</h2>
      <input
        type="text"
        value={content}
        name="content"
        onChange={handleChange}
      />
      <button type="button" className="button" onClick={add}>
        Add
      </button>
      {contentError ? <div className="error">{contentError}</div> : null}
    </div>
  );
};

export default AddTodo;
