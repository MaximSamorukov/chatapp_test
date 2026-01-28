
import  s from './app.module.scss';
import cn from 'classnames';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ControlPanel } from './components/ControlPanel';
import { InputField } from './components/InputField';
import { TodoItem } from './components/TodoItem';
import { selector, useAppSelector, type TodoItem as TodoItemType } from './state';
import { useEffect, useMemo, useState } from 'react';
import type { FilterType } from './types';
import { FILTER } from './constants';

function App() {
  const [filter, setFilter] = useState<FilterType>(FILTER.ALL);
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const originalTodos = useAppSelector(selector)

  const filteredTodos = useMemo(() => {
    if (filter === FILTER.DONE) {
      return originalTodos.filter((i) => i.isDone)
    }
    if (filter === FILTER.NOT_DONE) {
      return originalTodos.filter((i) => !i.isDone)
    }
    return originalTodos
  }, [filter, originalTodos])

  useEffect(() => {
    setTodos(() => filteredTodos)
  }, [filteredTodos])
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    if (active.id !== over?.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const emptyText = originalTodos.length === 0 ? 'У вас нет todos' : `У вас нет ${filter === FILTER.DONE ? 'выполненных' : 'невыполненных'} todos`
  return (
    <div className={s.container}>
      <InputField />
      <ControlPanel filter={filter} setFilter={setFilter}/>
      <div className={cn(s.todoItemsContainer, {[s.empty]: !todos.length})}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={todos}
            strategy={verticalListSortingStrategy}
          >
            {todos.map((i) => (
              <TodoItem key={i.id} id={i.id} title={i.title} isDone={i.isDone} />
            ))}
          </SortableContext>
        </DndContext>
        {!todos.length && <div>{emptyText}</div>}
      </div>
    </div>
  )
}

export default App
