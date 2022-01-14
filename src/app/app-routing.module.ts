import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

;

//Fica toda roda do projeto para ser renderizado.
const routes: Routes = [
  
  //Rota para LOGIN/entrar no sistema.
  {path: 'login', component: LoginComponent},

  //Rota NAVEGADOR com filhos HOME/TECNICOS
  {
    path: '', component: NavComponent, canActivate: [AuthGuard],//canActivate para acessar a rota apos fazer login para ter acesso as Filhas (HOME/Tecnico/CLiente)
    children: [
      { path: 'home', component: HomeComponent },

      {path: 'tecnicos', component: TecnicoListComponent},
      {path: 'tecnicos', component: TecnicoCreateComponent},
      {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
