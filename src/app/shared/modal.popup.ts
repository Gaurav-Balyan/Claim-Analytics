import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal.popup.html',
  styleUrls: ['./modal.popup.css']
})
export class ModalPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
