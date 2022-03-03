
import { Subject } from 'rxjs';
import { GenericDialogComponent } from './../../../components/molecules/generic-dialog/generic-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/molecules/delete/delete-dialog/delete-dialog.component';



export class GenericDialog {
  modalWasClosed = new Subject<any>();

constructor(
  private dialog: MatDialog
){}

public deleteWarningMessage(): MatDialogRef<DeleteDialogComponent> {
  return this.dialog.open(DeleteDialogComponent, {
    width: '600px',
  });
}

public loadingMessage(message: string): MatDialogRef<GenericDialogComponent>{
  return this.dialog.open(GenericDialogComponent,{
      data: {
        loading: true,
        content: message
      },
      disableClose: true
  });
}

public erroMessage(message: string): MatDialogRef<GenericDialogComponent>{
  return this.dialog.open(GenericDialogComponent,{
      data: {
        type: 'error',
        icon: 'error',
        title: message,
        btnOK: true
      },
      disableClose: true
  });
}

closeModal(){
  this.modalWasClosed.next;
}

 }
