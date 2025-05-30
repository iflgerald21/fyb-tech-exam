import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-96 relative" (click)="$event.stopPropagation()">
    <button type="button" (click)="onClose()" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700" aria-label="Close modal">
      <span class="sr-only">Close</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <h2 class="text-xl font-bold mb-4">Edit</h2>
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
        <button type="submit" class="w-full flex justify-center items-center gap-2 bg-green-400 text-black font-medium py-2 rounded-md hover:bg-gray-200 transition">
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
