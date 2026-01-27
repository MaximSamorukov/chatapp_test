
import  s from './app.module.scss';
import { InputField } from './components/InputField';
import { TodoItem } from './components/TodoItem';
import { useAppSelector } from './state';

function App() {
  const { todos } = useAppSelector((s) => s.todos)
  return (
    <div className={s.container}>
      <InputField />
      {todos.map((i) => (
        <TodoItem title={i.title} isDone={i.isDone} />
      ))}
    </div>
  )
}

export default App
