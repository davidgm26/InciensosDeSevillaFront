import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-prod-dialog',
  imports: [ButtonModule, Dialog, InputTextModule],
  templateUrl: './edit-prod-dialog.component.html',
  styleUrl: './edit-prod-dialog.component.css'
})
export class EditProdDialogComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}
