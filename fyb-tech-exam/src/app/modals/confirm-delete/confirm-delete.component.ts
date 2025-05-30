import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold text-blue-800">Delete</h2>
          <button (click)="onCancel()" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Confirmation Text -->
        <p class="text-sm text-blue-900 text-center mb-6">
          Are you sure you want to delete <span class="font-semibold"> {{ taskName }} </span>?
        </p>

        <!-- Delete Button -->
        <button
          (click)="onConfirm()"
          class="w-full flex justify-center items-center gap-2 bg-gray-100 text-red-600 font-medium py-2 rounded-md hover:bg-gray-200 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  `
})
export class DeleteConfirmationModalComponent {
  @Input() taskName: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
