import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAgendaAtendimentoComponent } from './app-agenda-atendimento.component';

describe('AppAgendaAtendimentoComponent', () => {
  let component: AppAgendaAtendimentoComponent;
  let fixture: ComponentFixture<AppAgendaAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAgendaAtendimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAgendaAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
