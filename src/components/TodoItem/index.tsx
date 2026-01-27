import React, { useState, type ChangeEvent } from 'react'
import CloseIcon from '../../assets/close.svg?react'
import DoneIcon from '../../assets/done.svg?react';
import NotDoneIcon from '../../assets/not_done.svg?react';
import EditIcon from '../../assets/edit.svg?react';
import EditInProgressIcon from '../../assets/edit_inprogress.svg?react';
import DragIcon from '../../assets/drag.svg?react';
import cn from 'classnames';
import s from './style.module.scss';
import { removeTodo, toggleTodoState, updateTodo, useAppDispatch, type TodoItem as TodoItemType } from '../../state';

type TodoItemProps = {
  title: TodoItemType['title'];
  isDone: TodoItemType['isDone'];
  id: TodoItemType['id'];
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, isDone }) => {
  const [editState, setEditState] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const dispatch = useAppDispatch()
  const removeItem = () => {
    dispatch(removeTodo({ id }))
  }
  const toggleTodo = () => {
    dispatch(toggleTodoState({ id }))
  }
  const handleEdit = () => {
    if (!editState) {
      setEditedTitle(title)
      setEditState(true)
    } else {
      if (editedTitle !== title) {
        dispatch(updateTodo({ id, isDone, title: editedTitle }))
      }
      setEditState(false)
    }
  }
  const onTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setEditedTitle(text)
  }
  const handleBlur = () => {
    if (editedTitle !== title) {
      dispatch(updateTodo({ id, isDone, title: editedTitle }))
    }
  }
  return (
    <div className={s.container}>
        {editState ? (
          <input onBlur={handleBlur} className={s.inputTitle} value={editedTitle} onChange={onTitleInputChange} />
        ) : (
          <div className={s.title}>
            {title}
          </div>
        )}
      <div className={s.controls}>
        <button className={s.control}>
          <DragIcon />
        </button>
        <button onClick={toggleTodo} className={s.control}>
          {isDone ? (<DoneIcon />) : (<NotDoneIcon/>)}
        </button>
        <button onClick={handleEdit} className={s.control}>
          {editState ? (<EditInProgressIcon />) : (<EditIcon />)}
        </button>
        <button onClick={removeItem} className={s.control}>
          <CloseIcon />
        </button>
      </div>
      </div>
  )
}

