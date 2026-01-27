import React from 'react'
import CloseIcon from '../../assets/close.svg?react'
import DoneIcon from '../../assets/done.svg?react';
import NotDoneIcon from '../../assets/not_done.svg?react';
import EditIcon from '../../assets/edit.svg?react';
import s from './style.module.scss';
import { removeTodo, toggleTodoState, useAppDispatch, type TodoItem as TodoItemType } from '../../state';

type TodoItemProps = {
  title: TodoItemType['title'];
  isDone: TodoItemType['isDone'];
  id: TodoItemType['id'];
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, isDone }) => {
  console.log(isDone)
  const dispatch = useAppDispatch()
  const removeItem = () => {
    dispatch(removeTodo({ id }))
  }
  const toggleTodo = () => {
    dispatch(toggleTodoState({ id }))
  }
  return (
    <div className={s.container}>
      <div className={s.title}>
        {title}
      </div>
      <div className={s.controls}>
        <button onClick={toggleTodo} className={s.control}>
          {isDone ? (<DoneIcon />) : (<NotDoneIcon/>)}
        </button>
        <button className={s.control}>
          <EditIcon />
        </button>
        <button onClick={removeItem} className={s.control}>
          <CloseIcon />
        </button>
      </div>
      </div>
  )
}

