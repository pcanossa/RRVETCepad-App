import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoVirtualComponent } from './ponto-virtual.component';

describe('PontoVirtualComponent', () => {
  let component: PontoVirtualComponent;
  let fixture: ComponentFixture<PontoVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoVirtualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PontoVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
