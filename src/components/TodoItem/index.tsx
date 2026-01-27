import React from 'react'

type TodoItemProps = {
  title: string;
  isDone: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({ title, isDone }) => {
  console.log(isDone)
  return (
    <div>{title}</div>
  )
}

