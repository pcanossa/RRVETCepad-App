import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEnfermagemComponent } from './app-enfermagem.component';

describe('AppEnfermagemComponent', () => {
  let component: AppEnfermagemComponent;
  let fixture: ComponentFixture<AppEnfermagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppEnfermagemComponent]
    });
    fixture = TestBed.createComponent(AppEnfermagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
