import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNavbarComponent } from './adm-navbar.component';

describe('AdmNavbarComponent', () => {
  let component: AdmNavbarComponent;
  let fixture: ComponentFixture<AdmNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
