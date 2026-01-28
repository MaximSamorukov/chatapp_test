import s from "./app.module.scss";
import cn from "classnames";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ControlPanel } from "./components/ControlPanel";
import { InputField } from "./components/InputField";
import { TodoItem } from "./components/TodoItem";
import {
  filteredTodosSelector,
  filterSelector,
  selector,
  setFilteredItemsWithNewOrder,
  useAppDispatch,
  useAppSelector,
} from "./state";
import { FILTER } from "./constants";

function App() {
  const filter = useAppSelector(filterSelector);
  const originalTodos = useAppSelector(selector);
  const filteredTodos = useAppSelector(filteredTodosSelector);
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = filteredTodos.findIndex((item) => item.id === active.id);
      const newIndex = filteredTodos.findIndex((item) => item.id === over?.id);
      const items = arrayMove(filteredTodos, oldIndex, newIndex);
      dispatch(setFilteredItemsWithNewOrder({ items }));
    }
  };

  const emptyText =
    originalTodos.length === 0
      ? "У вас нет todos"
      : `У вас нет ${filter === FILTER.DONE ? "выполненных" : "невыполненных"} todos`;
  return (
    <div className={s.container}>
      <InputField />
      <ControlPanel />
      <div
        className={cn(s.todoItemsContainer, {
          [s.empty]: !filteredTodos.length,
        })}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos}
            strategy={verticalListSortingStrategy}
          >
            {filteredTodos.map((i) => (
              <TodoItem
                key={i.id}
                id={i.id}
                title={i.title}
                isDone={i.isDone}
              />
            ))}
          </SortableContext>
        </DndContext>
        {!filteredTodos.length && <div>{emptyText}</div>}
      </div>
    </div>
  );
}

export default App;
