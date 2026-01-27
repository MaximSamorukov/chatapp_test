
import  s from './app.module.scss';
import cn from 'classnames';
import { ControlPanel } from './components/ControlPanel';
import { InputField } from './components/InputField';
import { TodoItem } from './components/TodoItem';
import { useAppSelector } from './state';
import { useState } from 'react';
import type { FilterType } from './types';



function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const todos = useAppSelector((s) => {
    if (filter === 'done') {
      return s.todos.todos.filter((i) => i.isDone)
    }
    if (filter === 'not_done') {
      return s.todos.todos.filter((i) => !i.isDone)
    }
    return s.todos.todos
  })
  return (
    <div className={s.container}>
      <InputField />
      <ControlPanel filter={filter} setFilter={setFilter}/>
      <div className={cn(s.todoItemsContainer, {[s.empty]: !todos.length})}>
        {todos.map((i) => (
          <TodoItem key={i.id} id={i.id} title={i.title} isDone={i.isDone} />
        ))}
        {!todos.length && <div>У вас пока нет todos</div>}
      </div>
    </div>
  )
}

export default App
