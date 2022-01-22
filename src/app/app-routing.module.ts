import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';

import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';

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
       //{path: 'tecnicos/telefones', component: TelefoneCreateComponent},
      // {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
      {path: 'clientes', component: ClienteListComponent},

      {path: 'chamados', component: ChamadoListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
