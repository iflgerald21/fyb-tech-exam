import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../services/task.service';
import { AddTaskModalComponent } from '../modals/add/add.component';
import { EditTaskModalComponent } from '../modals/edit/edit.component';
import { DeleteConfirmationModalComponent } from '../modals/confirm-delete/confirm-delete.component';
import { DoneComponent } from '../modals/done/done.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, AddTaskModalComponent, EditTaskModalComponent, DeleteConfirmationModalComponent, DoneComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskToDelete: Task | null = null;
  taskToDeleteIndex: number | null = null;
  showDeleteModal = false;
  taskToEdit: Task | null = null;
  taskToEditIndex = -1;
  showEditModal = false;
  taskToMarkAsDone: Task | null = null;
  selectedTaskIndex: number | null = null;
  showConfirmModal = false;

  showModal = false; 

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log("task", this.tasks)
    });
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

addTask(name: any, description: any) {
  this.taskService.addTask(name, description).subscribe(() => {
    this.loadTasks();
    this.closeModal();
  });
}


  confirmDelete(index: number) {
    this.taskToDeleteIndex = index;
    this.taskToDelete = this.tasks[index];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.taskToDeleteIndex = null;
    this.taskToDelete = null;
    this.showDeleteModal = false;
  }

 removeTaskConfirmed() {
  if (this.taskToDelete && this.taskToDelete.id) {
    this.taskService.deleteTask(this.taskToDelete.id).subscribe(() => {
      this.loadTasks();
      this.cancelDelete();
    });
  } else {
    console.error('Task id is missing!');
  }
}



  openEditModal(index: number) {
    this.taskToEditIndex = index;
    this.taskToEdit = { ...this.tasks[index] };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.taskToEditIndex = -1;
    this.taskToEdit = null;
  }

saveEditedTask(event: { name: string; description: string }) {
  if (this.taskToEdit) {
    const updatedTask: Task = {
      id: this.taskToEdit.id,
      name: event.name,
      description: event.description,
      done: this.taskToEdit.done
    };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
      this.closeEditModal();  
    });
  }
}



  requestMarkAsDone(index: number) {
    this.taskToMarkAsDone = { ...this.tasks[index] };
    this.selectedTaskIndex = index;
    this.showConfirmModal = true;
  }

confirmMarkAsDone() {
  if (this.taskToMarkAsDone) {
    this.taskToMarkAsDone.done = true;
    this.taskService.updateTask(this.taskToMarkAsDone).subscribe(() => {
      this.loadTasks();
      this.cancelMarkAsDone();
    });
  }
}


  cancelMarkAsDone() {
    this.selectedTaskIndex = null;
    this.taskToMarkAsDone = null;
    this.showConfirmModal = false;
  }
}
