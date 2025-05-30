import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
          <!-- Close Button -->
          <button type="button" (click)="onClose()" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700" aria-label="Close modal">
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Modal Title -->
          <h2 class="text-lg font-semibold text-gray-800 mb-4">New Task</h2>

      <form (ngSubmit)="submit(taskForm)" #taskForm="ngForm" novalidate>
        <!-- Task Input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Task</label>
          <input 
            type="text"
            [(ngModel)]="taskName"
            name="taskName"
            required
            #taskNameInput="ngModel"
            placeholder="Task"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <p *ngIf="taskNameInput.invalid && taskNameInput.touched" class="text-sm text-red-600 mt-1">
            Task name is required.
          </p>
        </div>

        <!-- Description Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            [(ngModel)]="taskDescription"
            name="taskDescription"
            maxlength="250"
            #descInput="ngModel"
            placeholder="Description (max 250 characters)"
            class="w-full px-4 py-2 h-24 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
          </textarea>
          <p class="text-xs text-gray-500 text-right">{{ taskDescription.length }}/250</p>
          <p *ngIf="descInput.invalid && descInput.touched" class="text-sm text-red-600 mt-1">
            Description must be under 250 characters.
          </p>
        </div>

        <!-- Add Button -->
        <button
          type="submit"
          [disabled]="taskForm.invalid"
          class="disabled:opacity-50 w-full flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white font-medium py-2 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </form> 
      </div>
  </div>
  `,
})
export class AddTaskModalComponent {
  taskName = '';
  taskDescription = '';

  @Output() close = new EventEmitter<void>();

  // Emit a Task object instead of just a string
  @Output() addTask = new EventEmitter<Task>();

  onClose() {
    this.close.emit();
  }

  submit(form: any) {
  if (form.invalid) return;

  this.addTask.emit({
    name: this.taskName.trim(),
    description: this.taskDescription.trim(),
  });

  this.taskName = '';
  this.taskDescription = '';
  this.onClose();
}

}
