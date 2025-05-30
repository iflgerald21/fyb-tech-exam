import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskModalComponent } from '../modals/add/add.component';
import { EditTaskModalComponent } from '../modals/edit/edit.component';
import { DeleteConfirmationModalComponent } from '../modals/confirm-delete/confirm-delete.component';
import { ConfirmComponent } from '../modals/done/done.component';

interface Task {
  name: string;
  description: string;
  done?: boolean;
}
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, AddTaskModalComponent, EditTaskModalComponent, DeleteConfirmationModalComponent, ConfirmComponent ],
  templateUrl:'./task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  showModal = false;
  
  showEditModal = false;
  tasks: Task[] = [];
  taskToEdit: Task | null = null;
  taskToEditIndex = -1;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addTask(name: string, description: string) {
     this.tasks.push({
      name,
      description,
      done: false,
    });
  }

  taskToDeleteIndex: number | null = null;
showDeleteModal = false;

confirmDelete(index: number) {
  this.taskToDeleteIndex = index;
  this.showDeleteModal = true;
}

cancelDelete() {
  this.taskToDeleteIndex = null;
  this.showDeleteModal = false;
}

removeTaskConfirmed() {
  if (this.taskToDeleteIndex !== null) {
    this.tasks.splice(this.taskToDeleteIndex, 1);
    this.cancelDelete();
  }
}
  openEditModal(index: number) {
  this.taskToEditIndex = index;
  this.taskToEdit = this.tasks[index];
  this.showEditModal = true;
}
  closeEditModal() {
    this.showEditModal = false;
    this.taskToEditIndex = -1;
    // this.taskToEdit = '';
  }
  saveEditedTask(updatedTask: Task) {
  if (this.taskToEditIndex >= 0) {
    this.tasks[this.taskToEditIndex] = updatedTask;
    this.closeEditModal();
  }
}

showConfirmModal = false;
  selectedTaskIndex: number | null = null;

  requestMarkAsDone(index: number) {
    this.selectedTaskIndex = index;
    this.showConfirmModal = true;
  }

  confirmMarkAsDone() {
    if (this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex].done = true;
      this.selectedTaskIndex = null;
    }
    this.showConfirmModal = false;
  }

  cancelMarkAsDone() {
    this.selectedTaskIndex = null;
    this.showConfirmModal = false;
  }

  editTask(index: number) {
    // Optional: implement edit functionality
    alert(`Edit task "${this.tasks[index]}" - Not implemented`);
  }
}
