import React from 'react';
import cn from 'classnames';
import DoneIcon  from '../../assets/done.svg?react';
import NotDoneIcon  from '../../assets/not_done.svg?react';

import s from './style.module.scss';
import type { FilterType } from '../../types';
import { FILTER } from '../../constants';

type ControlPanelProps = {
  filter: FilterType
  setFilter: (arg: FilterType) => void
}



export const ControlPanel: React.FC<ControlPanelProps> = ({ filter, setFilter }) => {
  const toggleDoneFilter = () => {
    if (filter === FILTER.DONE) {
      setFilter(FILTER.ALL);
    } else {
      setFilter(FILTER.DONE)
    }
  }
  const toggleNotDoneFilter = () => {
    if (filter === FILTER.NOT_DONE) {
      setFilter(FILTER.ALL);
    } else {
      setFilter(FILTER.NOT_DONE)
    }
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

