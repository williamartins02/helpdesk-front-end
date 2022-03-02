
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent{
  public title:   string;
  public content: string;
  public type:    string;
  public icon:    string;
  public loading: boolean;
  public btnOK:   boolean

  constructor(@Inject(MAT_DIALOG_DATA)private data) { 
    this.title =   data.title;
    this.content = data.content;
    this.type =    data.type ? data.type : 'default';
    this.icon =    data.icon ? data.icon : null;
    this.loading = !!data.loading;
    this.btnOK =   !!data.btnOK;
  }

}
