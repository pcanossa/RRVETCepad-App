import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmClientesComponent } from './adm-clientes.component';

describe('AdmClientesComponent', () => {
  let component: AdmClientesComponent;
  let fixture: ComponentFixture<AdmClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmClientesComponent]
    });
    fixture = TestBed.createComponent(AdmClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
