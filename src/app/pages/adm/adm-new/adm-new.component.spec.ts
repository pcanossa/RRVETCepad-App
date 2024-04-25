import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNewComponent } from './adm-new.component';

describe('AdmNewComponent', () => {
  let component: AdmNewComponent;
  let fixture: ComponentFixture<AdmNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
