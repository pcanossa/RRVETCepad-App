import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimaisComponent } from './pages/conveniado/animais/animais.component';
import { LoginComponent } from './pages/login/login.component';
import { AnimalPageComponent } from './pages/conveniado/animal-page/animal-page.component';
import { PrimeiroAcessoComponent } from './pages/login/primeiro-acesso/primeiro-acesso.component';
import { NovaSenhaComponent } from './pages/login/nova-senha/nova-senha.component';
import { RecuperaSenhaComponent } from './pages/login/recupera-senha/recupera-senha.component';
import { HomeComponent } from './pages/home/home.component';
import { UnidadesComponent } from './pages/home/unidades/unidades.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdmLoginComponent } from './pages/adm/adm-login/adm-login.component';
import { ContratoComponent } from './pages/home/contrato/contrato.component';
import { AdmComponent } from './pages/adm/adm.component';
import { CadastroPessoaComponent } from './pages/adm/cadastro-pessoa/cadastro-pessoa.component';
import { AdmNewComponent } from './pages/adm/adm-new/adm-new.component';
import { AuthGuardADMService } from './services/auth-guard-adm.service';
import { TelemedicinaComponent } from './pages/home/telemedicina/telemedicina.component';
import { AdmRecuperaComponent } from './pages/adm/adm-recupera/adm-recupera.component';
import { CadastroAnimalComponent } from './pages/adm/cadastro-animal/cadastro-animal.component';
import { AgendamentoComponent } from './pages/conveniado/agendamento/agendamento.component';
import { AgendaComponent } from './pages/adm/agenda/agenda.component';
import { PontoVirtualComponent } from './pages/adm/ponto-virtual/ponto-virtual.component';
import { AppAgendaAtendimentoComponent } from './pages/adm/app-agenda-atendimento/app-agenda-atendimento.component';
import { AppVetComponent } from './pages/adm/app-vet/app-vet.component';
import { AppAtendimentoComponent } from './pages/adm/app-atendimento/app-atendimento.component';
import { ReceituarioComponent } from './pages/adm/receituario/receituario.component';
import { AdmClientesComponent } from './pages/adm/adm-clientes/adm-clientes.component';
import { AdmBuscaAnimalComponent } from './pages/adm/adm-busca-animal/adm-busca-animal.component';
import { AtualizaTutorComponent } from './pages/adm/atualiza-tutor/atualiza-tutor.component';
import { AtualizaAnimalComponent } from './pages/adm/atualiza-animal/atualiza-animal.component';
import { AppEnfermagemComponent } from './pages/adm/app-enfermagem/app-enfermagem.component';
import { ProntuarioComponent } from './pages/adm/prontuario/prontuario.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: AnimaisComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'animalPage',
    component: AnimalPageComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'primeiroAcesso',
    component: PrimeiroAcessoComponent
  },
  {
    path: 'novaSenha',
    component: NovaSenhaComponent
  },
  {
    path: 'recuperaSenha',
    component: RecuperaSenhaComponent
  },
  {
    path: 'unidades',
    component: UnidadesComponent
  },
  {
    path: 'adm-login',
    component: AdmLoginComponent
  },
  {
    path: 'contrato',
    component: ContratoComponent
  },
  {
    path: 'app',
    component: AdmComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-novoCliente',
    component: CadastroPessoaComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-new',
    component: AdmNewComponent
  },
  {
    path: 'app-login',
    component: AdmLoginComponent
  },
  {
    path: 'telemedicina',
    component: TelemedicinaComponent
  },
  {
    path: 'app-recuperaSenha',
    component: AdmRecuperaComponent
  },
  {
    path: 'app-novoAnimal',
    component: CadastroAnimalComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'agendamentoconsulta',
    component: AgendamentoComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-agenda',
    component: AgendaComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-pontoVirtual',
    component: PontoVirtualComponent
  },
  {
    path: 'app-agendaAtendimento',
    component: AppAgendaAtendimentoComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-vet',
    component: AppVetComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-atendimento',
    component: AppAtendimentoComponent,
    //canActivate: [AuthGuardADMService]
  },
  {
    path: 'receita',
    component: ReceituarioComponent,
  },
  {
    path: 'clientes',
    component: AdmClientesComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'animais',
    component: AdmBuscaAnimalComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'atualizaTutor',
    component: AtualizaTutorComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'atualizaAnimal',
    component: AtualizaAnimalComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'app-enfermagem',
    component: AppEnfermagemComponent,
    canActivate: [AuthGuardADMService]
  },
  {
    path: 'prontuario',
    component: ProntuarioComponent,
    canActivate: [AuthGuardADMService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
