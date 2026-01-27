import React, { useState, type ChangeEvent } from 'react'
import { addTodo, useAppDispatch } from '../../state'
import s from './style.module.scss';

type InputFieldProps = {
  
}

export const InputField: React.FC<InputFieldProps> = () => {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTitle(text)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const todoItem = {
      title,
      isDone: false
    }
    setTitle('')
    dispatch(addTodo(todoItem))
  }
  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input className={s.input}  name="todoTitle" value={title} onChange={handleChange} />
      </form>
    </div>
  )
}

