import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const addTask = createAction('[Task] Add', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete', props<{ id: string }>());
export const markTaskDone = createAction('[Task] Mark Done', props<{ id: string }>());