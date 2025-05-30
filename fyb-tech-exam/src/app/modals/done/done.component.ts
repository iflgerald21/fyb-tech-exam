import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './done.component.html',
})
export class DoneComponent {
  @Input() visible: boolean = false;
  @Input() message: string = '';
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
