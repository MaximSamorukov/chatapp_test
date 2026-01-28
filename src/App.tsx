
import  s from './app.module.scss';
import cn from 'classnames';
import { ControlPanel } from './components/ControlPanel';
import { InputField } from './components/InputField';
import { TodoItem } from './components/TodoItem';
import { selector, useAppSelector } from './state';
import { useMemo, useState } from 'react';
import type { FilterType } from './types';
import { FILTER } from './constants';



function App() {
  const [filter, setFilter] = useState<FilterType>(FILTER.ALL);
  const originalTodos = useAppSelector(selector)

  const todos = useMemo(() => {
        if (filter === FILTER.DONE) {
      return originalTodos.filter((i) => i.isDone)
    }
    if (filter === FILTER.NOT_DONE) {
      return originalTodos.filter((i) => !i.isDone)
    }
    return originalTodos
  }, [filter, originalTodos])

  const emptyText = originalTodos.length === 0 ? 'У вас нет todos' : `У вас нет ${filter === FILTER.DONE ? 'выполненных' : 'невыполненных'} todos`
  return (
    <div className={s.container}>
      <InputField />
      <ControlPanel filter={filter} setFilter={setFilter}/>
      <div className={cn(s.todoItemsContainer, {[s.empty]: !todos.length})}>
        {todos.map((i) => (
          <TodoItem key={i.id} id={i.id} title={i.title} isDone={i.isDone} />
        ))}
        {!todos.length && <div>{emptyText}</div>}
      </div>
    </div>
  )
}

export default App
