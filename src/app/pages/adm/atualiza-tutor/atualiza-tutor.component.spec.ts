import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizaTutorComponent } from './atualiza-tutor.component';

describe('AtualizaTutorComponent', () => {
  let component: AtualizaTutorComponent;
  let fixture: ComponentFixture<AtualizaTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizaTutorComponent]
    });
    fixture = TestBed.createComponent(AtualizaTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
