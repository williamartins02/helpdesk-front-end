import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  
  constructor(private readonly dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  public closeModal(confirm?: boolean): void{
    this.dialogRef.close(confirm);
  }
}
