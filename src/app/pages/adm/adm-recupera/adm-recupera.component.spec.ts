import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmRecuperaComponent } from './adm-recupera.component';

describe('AdmRecuperaComponent', () => {
  let component: AdmRecuperaComponent;
  let fixture: ComponentFixture<AdmRecuperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmRecuperaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmRecuperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
