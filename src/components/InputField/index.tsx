import React, { useState, type ChangeEvent } from 'react'
import { addTodo, useAppDispatch } from '../../state'

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
    console.log(title);
    const todoItem = {
      title,
      isDone: false
    }
    dispatch(addTodo(todoItem))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="todoTitle" value={title} onChange={handleChange} />
      </form>
    </div>
  )
}

