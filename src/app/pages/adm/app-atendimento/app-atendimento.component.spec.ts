import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAtendimentoComponent } from './app-atendimento.component';

describe('AppAtendimentoComponent', () => {
  let component: AppAtendimentoComponent;
  let fixture: ComponentFixture<AppAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAtendimentoComponent]
    });
    fixture = TestBed.createComponent(AppAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
