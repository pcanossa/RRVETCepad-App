import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveniadoComponent } from './conveniado/conveniado.component';
import { ResizeNavbarComponent } from './resize-navbar/resize-navbar.component';
import { AdmComponent } from './adm/adm.component';
import { AnimaisComponent } from './conveniado/animais/animais.component';
import { CadastroPessoaComponent } from './adm/cadastro-pessoa/cadastro-pessoa.component';
import { CadastroAnimalComponent } from './adm/cadastro-animal/cadastro-animal.component';
import { NavbarComponent } from './conveniado/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AnimalPageComponent } from './conveniado/animal-page/animal-page.component';
import { HeaderComponent } from './conveniado/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeiroAcessoComponent } from './login/primeiro-acesso/primeiro-acesso.component';
import { HttpClientModule } from '@angular/common/http';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';
import { RecuperaSenhaComponent } from './login/recupera-senha/recupera-senha.component';
import { HomeComponent } from './home/home.component';
import { HomeNavbarComponent } from './home/home-navbar/home-navbar.component';
import { ContatoComponent } from './home/contato/contato.component';
import { UnidadesComponent } from './home/unidades/unidades.component';
import { AdmNavbarComponent } from './adm/adm-navbar/adm-navbar.component';
import { AdmLoginComponent } from './adm/adm-login/adm-login.component';
import { ContratoComponent } from './home/contrato/contrato.component';
import { AdmHeaderComponent } from './adm/adm-header/adm-header.component';
import { FormsModule } from '@angular/forms';
import { AdmNewComponent } from './adm/adm-new/adm-new.component';
import { TelemedicinaComponent } from './home/telemedicina/telemedicina.component';
import { AnimaisAppService } from '../services/animais-app.service';
import { AdmRecuperaComponent } from './adm/adm-recupera/adm-recupera.component';
import { AgendamentoComponent } from './conveniado/agendamento/agendamento.component';
import { AgendaComponent } from './adm/agenda/agenda.component';
import { PontoVirtualComponent } from './adm/ponto-virtual/ponto-virtual.component';
import { AppAgendaAtendimentoComponent } from './adm/app-agenda-atendimento/app-agenda-atendimento.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { AppVetComponent } from './adm/app-vet/app-vet.component';
import { AppAtendimentoComponent } from './adm/app-atendimento/app-atendimento.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { ReceituarioComponent } from './adm/receituario/receituario.component';
import { CadBoletosComponent } from './home/cad-boletos/cad-boletos.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdmBuscaAnimalComponent } from './adm/adm-busca-animal/adm-busca-animal.component';
import { AdmClientesComponent } from './adm/adm-clientes/adm-clientes.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AtualizaTutorComponent } from './adm/atualiza-tutor/atualiza-tutor.component';
import { AtualizaAnimalComponent } from './adm/atualiza-animal/atualiza-animal.component';
import { AppEnfermagemComponent } from './adm/app-enfermagem/app-enfermagem.component';







@NgModule({
  declarations: [
    ResizeNavbarComponent,
    ConveniadoComponent,
    AdmComponent,
    AnimaisComponent,
    CadastroPessoaComponent,
    CadastroAnimalComponent,
    NavbarComponent,
    LoginComponent,
    AnimalPageComponent,
    HeaderComponent,
    PrimeiroAcessoComponent,
    NovaSenhaComponent,
    RecuperaSenhaComponent,
    HomeNavbarComponent,
    ContatoComponent,
    UnidadesComponent,
    AdmNavbarComponent,
    AdmLoginComponent,
    ContratoComponent,
    AdmHeaderComponent,
    AdmNewComponent,
    TelemedicinaComponent,
    AdmRecuperaComponent,
    AgendamentoComponent,
    AgendaComponent,
    PontoVirtualComponent,
    AppAgendaAtendimentoComponent,
    AppVetComponent,
    HomeComponent,
    AppAtendimentoComponent,
    ReceituarioComponent,
    CadBoletosComponent,
    AdmBuscaAnimalComponent,
    AdmClientesComponent,
    AtualizaTutorComponent,
    AtualizaAnimalComponent,
    AppEnfermagemComponent
  ],
  providers: [AnimaisAppService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxScannerQrcodeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ]
})
export class PagesModule { }
