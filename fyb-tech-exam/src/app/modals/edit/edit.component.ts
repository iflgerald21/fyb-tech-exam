import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96" (click)="$event.stopPropagation()">
        <h2 class="text-xl font-bold mb-4">Edit Task</h2>
        <form (ngSubmit)="submit()" #taskForm="ngForm" novalidate>
          <label class="block mb-2 font-semibold">Task Name</label>
          <input
            type="text"
            [(ngModel)]="taskName"
            name="taskName"
            required
            class="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter task name"
          />
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              [(ngModel)]="taskDescription"
              name="taskDescription"
              placeholder="Description"
              class="w-full px-4 py-2 h-24 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
            </textarea>
          </div>

          <div class="flex justify-end space-x-2">
            <button type="button" class="px-4 py-2" (click)="onClose()">Cancel</button>
            <button
              type="submit"
              class="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
              [disabled]="!taskName.trim()"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class EditTaskModalComponent {
  @Input() taskName = '';
  @Input() taskDescription = '';
  @Output() close = new EventEmitter<void>();

  // FIXED: emit the correct object type
  @Output() saveTask = new EventEmitter<{ name: string; description: string }>();

  onClose() {
    this.close.emit();
  }

  submit() {
    if (this.taskName.trim()) {
      this.saveTask.emit({
        name: this.taskName.trim(),
        description: this.taskDescription.trim(),
      });
      this.onClose();
    }
  }
}
