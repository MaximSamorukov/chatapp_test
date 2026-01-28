import React from 'react';
import cn from 'classnames';
import DoneIcon  from '../../assets/done.svg?react';
import NotDoneIcon  from '../../assets/not_done.svg?react';
import { FILTER } from '../../constants';
import { useAppDispatch, toggleDoneFilter as toggleDoneFilterAction, toggleNotDoneFilter as toggleNotDoneFilterAction, useAppSelector, type RootState, filterSelector } from '../../state';

import s from './style.module.scss';

type ControlPanelProps = {}

export const ControlPanel: React.FC<ControlPanelProps> = () => {
  const filter = useAppSelector(filterSelector)
  const dispatch = useAppDispatch();
  const toggleDoneFilter = () => {
    dispatch(toggleDoneFilterAction())
  }
  const toggleNotDoneFilter = () => {
    dispatch(toggleNotDoneFilterAction())
  }
  return (
    <div className={s.container}>
      <button onClick={toggleDoneFilter} className={cn(s.filter, {[s.active]: filter === FILTER.DONE})}>
        <DoneIcon />
      </button>
      <button onClick={toggleNotDoneFilter} className={cn(s.filter, {[s.active]: filter === FILTER.NOT_DONE})}>
        <NotDoneIcon />
      </button>

    </div>
  )
}

