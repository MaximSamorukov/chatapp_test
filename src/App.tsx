
import  s from './app.module.scss';
import cn from 'classnames';
import { ControlPanel } from './components/ControlPanel';
import { InputField } from './components/InputField';
import { TodoItem } from './components/TodoItem';
import { useAppSelector } from './state';

function App() {
  const { todos } = useAppSelector((s) => s.todos)
  return (
    <div className={s.container}>
      <InputField />
      <ControlPanel />
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
