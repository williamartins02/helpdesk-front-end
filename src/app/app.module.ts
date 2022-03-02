
 import { GenericDialogComponent } from './components/molecules/generic-dialog/generic-dialog.component';

import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';

import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';

import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';

import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';



import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Para trabalhar com form reativos no angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//para realizar requisiões HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//Imports para componetes do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';



//component do projeto.
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoTelefoneListComponent } from './components/tecnico/telefone-tecnico/tecnico-telefone-list/tecnico-telefone-list.component';
import { TecnicoTelefoneUpdateComponent } from './components/tecnico/telefone-tecnico/tecnico-telefone-update/tecnico-telefone-update.component';
import { TecnicoTelefoneCreateComponent } from './components/tecnico/telefone-tecnico/tecnico-telefone-create/tecnico-telefone-create.component';
import { TecnicoTelefoneDeleteComponent } from './components/tecnico/telefone-tecnico/tecnico-telefone-delete/tecnico-telefone-delete.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { RelatorioChamadoComponent } from './components/chamado/relatorio-chamado/relatorio-chamado.component';
import { ReportParamComponent } from './components/chamado/report-param/report-param.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LineChartComponent } from './components/chamado/chart/line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ChatComponent } from './components/chat/chat/chat.component';
import { DeleteDialogComponent } from './components/molecules/delete/delete-dialog/delete-dialog.component';
import { OrganismsComponent } from './components/organisms/organisms.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,

    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoListComponent,
    TecnicoDeleteComponent,

    ClienteCreateComponent,
    ClienteListComponent,
    ClienteUpdateComponent,

    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent,

    TecnicoTelefoneListComponent,
    TecnicoTelefoneUpdateComponent,
    TecnicoTelefoneCreateComponent,
    TecnicoTelefoneDeleteComponent,
    RelatorioChamadoComponent,
    ReportParamComponent,
    GenericDialogComponent,
    LineChartComponent,
    ChatComponent,
    DeleteDialogComponent,
    OrganismsComponent,
   
    
    
  ],
  imports: [
    MatCardModule,
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Angular material
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ScrollingModule,
    MatTabsModule,
    MatDatepickerModule,
    MatTooltipModule,
    FormsModule,
    //Configuração para Service ToastrModule
    ToastrModule.forRoot({ timeOut: 4000, closeButton: true, progressBar: true}),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false // Ao salvar, vai manter a mascara
    }),
    //form reactive
    FormsModule,
    ReactiveFormsModule,
    //requisições Http
    HttpClientModule,
  ],

  providers: [AuthInterceptorProvider,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

 
