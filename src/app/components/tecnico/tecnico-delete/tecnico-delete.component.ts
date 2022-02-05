import { GenericDialogComponent } from "src/app/components/generic/generic-dialog/generic-dialog.component";
import { GenericDialog } from "./../../../models/dialog/generic-dialog/generic-dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "./../../../services/tecnico.service";
import { Tecnico } from "./../../../models/tecnico";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: Number },
    public dialogRef: MatDialogRef<TecnicoDeleteComponent>,
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {
    this.findById();
  }

  public closeModal(confirm?: boolean): void {
    this.dialogRef.close(confirm);
  }

  findById(): void {
    this.service.findById(this.data.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }
  delete(): void {
    this.onNoClick();
    const matDialogRef = this.genericDialog.loadingMessage("Deletando técnico...");
    this.service.delete(this.tecnico.id).subscribe(() => {
        setTimeout(() => {
          matDialogRef.close();
          this.toast.success("Deletado com sucesso","Técnico(a) " + this.tecnico.nome);
          this.router.navigate(["/tecnicos"]);
        }, 500);
      },(err) => {
        //listando LIST de erro.
        matDialogRef.close();
        if (err.error.errors)
          err.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        this.toast.error(err.error.message);
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
