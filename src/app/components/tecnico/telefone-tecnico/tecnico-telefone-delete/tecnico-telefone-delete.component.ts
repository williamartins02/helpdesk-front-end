import { throwError } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { Telefone } from 'src/app/models/telefone';
import { TelefoneService } from 'src/app/services/telefone.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-telefone-delete',
  templateUrl: './tecnico-telefone-delete.component.html',
  styleUrls: ['./tecnico-telefone-delete.component.css']
})
export class TecnicoTelefoneDeleteComponent implements OnInit {
  telefone: Telefone = {
    id: '',
    numero:       '',
    tecnico:      '',
    tipoTelefone: '',
    nomeTecnico:  '',
  }

  TELEFONE_DATA: Telefone[] = [];
  dataSource = new MatTableDataSource<Telefone>(this.TELEFONE_DATA);
  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    public dialogRef: MatDialogRef<TecnicoTelefoneDeleteComponent>,
    private service: TelefoneService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,) { }

    ngOnInit(): void {
      this.findById();
    }

  public closeModal(confirm?: boolean): void{
    this.dialogRef.close(confirm);
  }

  findById(): void {
    this.service.findById(this.data.id).subscribe(() => {
    })
  }

  delete(): void {
    this.service.delete(this.data.id).subscribe(() => {
      this.toast.success('Deletado com sucesso', 'Telefone');
      this.router.navigate(['/telefones']);
      this.onNoClick();
    }, (err) => {//listando LIST de erro.
      if (err.error.errors)
        err.error.errors.forEach((element) => {
          this.toast.error(element.message);
        });
      this.toast.error(err.error.message)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
