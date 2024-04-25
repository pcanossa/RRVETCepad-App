import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaAnimalComponent } from './atualiza-animal.component';

describe('AtualizaAnimalComponent', () => {
  let component: AtualizaAnimalComponent;
  let fixture: ComponentFixture<AtualizaAnimalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizaAnimalComponent]
    });
    fixture = TestBed.createComponent(AtualizaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
