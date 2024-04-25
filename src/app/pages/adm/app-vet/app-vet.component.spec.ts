import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVetComponent } from './app-vet.component';

describe('AppVetComponent', () => {
  let component: AppVetComponent;
  let fixture: ComponentFixture<AppVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppVetComponent]
    });
    fixture = TestBed.createComponent(AppVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
