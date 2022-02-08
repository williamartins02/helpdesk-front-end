import { Subject } from 'rxjs';
import { GenericDialogComponent } from './../../../components/molecules/generic-dialog/generic-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



export class GenericDialog {
  modalWasClosed = new Subject<any>();

constructor(
  private dialog: MatDialog
){}

public successMessage(message): MatDialogRef<GenericDialogComponent>{
  return this.dialog.open(GenericDialogComponent,{
    data: {
      typ: 'success',
      icon: 'check_circle',
      title: message,
      btnOK: true
    }
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
