import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadBoletosComponent } from './cad-boletos.component';

describe('CadBoletosComponent', () => {
  let component: CadBoletosComponent;
  let fixture: ComponentFixture<CadBoletosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadBoletosComponent]
    });
    fixture = TestBed.createComponent(CadBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
