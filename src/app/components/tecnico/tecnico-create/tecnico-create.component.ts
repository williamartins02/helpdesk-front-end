import { GenericDialogComponent } from "src/app/components/generic/generic-dialog/generic-dialog.component";
import { GenericDialog } from "./../../../models/dialog/generic-dialog/generic-dialog";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "./../../../models/tecnico";
import { TecnicoService } from "./../../../services/tecnico.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;

  hide = true; //esconder e aparecer senha

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  /*Validação usando o FormControl*/
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<TecnicoCreateComponent>,
    public dialog: MatDialog
  ) {
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {}

  /*Metodo para criar um Tecnico*/
  public create(): void{
    this.onNoClick();
     const matDialogRef = this.genericDialog.loadingMessage("Salvando técnico...");
    this.service.create(this.tecnico).subscribe(() => {
        setTimeout(() => {
          matDialogRef.close();
          this.router.navigate(["/tecnicos"]); //assim que salvar voltar para pagina ListTecnicos
          this.toast.success("Cadastrado(a) com sucesso","Técnico(a) " + this.tecnico.nome
          );
        }, 500)
      },(err) => {
        matDialogRef.close();
        if(err.error.errors)//tratado erro com lista de erro dentro do arrays
           err.error.errors.forEach((element) => {
             this.toast.error(element.message);
           });    
      this.toast.error(err.error.message)
    })
  }

  /*Adicionando um perfil com CheckBox/ verificando se ja existe na lista ao clicar/desclicar*/
  addPerfil(perfil: any): void {
    /*Verificando se existe o tencico ja na lista de perfils ao desmarca a opção*/
    if (this.tecnico.perfis.includes(perfil)) {
      //verificando se ja tem o objeto na lista de perfil.
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1); //se tiver o perfil ja na lista remove
    }
    this.tecnico.perfis.push(perfil); //adicionado o perfil clicado// se lee não tiver na lista, adicionar..
  }

  /* validando o retorno dos campos.*/
  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
