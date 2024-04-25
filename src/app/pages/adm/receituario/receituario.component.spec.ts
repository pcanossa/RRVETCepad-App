import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceituarioComponent } from './receituario.component';

describe('ReceituarioComponent', () => {
  let component: ReceituarioComponent;
  let fixture: ComponentFixture<ReceituarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceituarioComponent]
    });
    fixture = TestBed.createComponent(ReceituarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
