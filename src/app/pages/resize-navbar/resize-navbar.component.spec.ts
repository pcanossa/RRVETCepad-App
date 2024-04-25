import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeNavbarComponent } from './resize-navbar.component';

describe('ResizeNavbarComponent', () => {
  let component: ResizeNavbarComponent;
  let fixture: ComponentFixture<ResizeNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizeNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
