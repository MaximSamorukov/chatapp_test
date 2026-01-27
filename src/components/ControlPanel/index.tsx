import React from 'react';
import cn from 'classnames';
import DoneIcon  from '../../assets/done.svg?react';
import NotDoneIcon  from '../../assets/not_done.svg?react';

import s from './style.module.scss';
import type { FilterType } from '../../types';

type ControlPanelProps = {
  filter: FilterType
  setFilter: (arg: FilterType) => void
}



export const ControlPanel: React.FC<ControlPanelProps> = ({ filter, setFilter }) => {
  const toggleDoneFilter = () => {
    if (filter === 'done') {
      setFilter('all');
    } else {
      setFilter('done')
    }
  }
  const toggleNotDoneFilter = () => {
    if (filter === 'not_done') {
      setFilter('all');
    } else {
      setFilter('not_done')
    }
  }
  return (
    <div className={s.container}>
      <button onClick={toggleDoneFilter} className={cn(s.filter, {[s.active]: filter === 'done'})}>
        <DoneIcon />
      </button>
      <button onClick={toggleNotDoneFilter} className={cn(s.filter, {[s.active]: filter === 'not_done'})}>
        <NotDoneIcon />
      </button>

    </div>
  )
}

