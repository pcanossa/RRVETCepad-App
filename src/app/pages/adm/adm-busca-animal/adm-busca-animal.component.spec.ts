import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmBuscaAnimalComponent } from './adm-busca-animal.component';

describe('AdmBuscaAnimalComponent', () => {
  let component: AdmBuscaAnimalComponent;
  let fixture: ComponentFixture<AdmBuscaAnimalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmBuscaAnimalComponent]
    });
    fixture = TestBed.createComponent(AdmBuscaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
