
import  s from './app.module.scss';
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
      {todos.map((i) => (
        <TodoItem id={i.id} title={i.title} isDone={i.isDone} />
      ))}
    </div>
  )
}

export default App
