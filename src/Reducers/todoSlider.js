import { createSlice } from "@reduxjs/toolkit";

export const toDoSlider = createSlice({
  name: "toDo",
  initialState: {
    todoList: [
      { id: 1, content: "Hit the gym" },
      { id: 2, content: "Meet george" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      let newTodoList = {
        id: Math.random() * 10,
        content: action.payload.newContent,
      };
      state.todoList.push(newTodoList);
    },
    deleteTodo: (state, action) => {
      let { todoList } = state;
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    editTodo: (state, action) => {
      let { todoList } = state;
      state.todoList = todoList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = toDoSlider.actions;

export default toDoSlider.reducer;
