import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniadoComponent } from './conveniado.component';

describe('ConveniadoComponent', () => {
  let component: ConveniadoComponent;
  let fixture: ComponentFixture<ConveniadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveniadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveniadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
