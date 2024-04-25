import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicinaComponent } from './telemedicina.component';

describe('TelemedicinaComponent', () => {
  let component: TelemedicinaComponent;
  let fixture: ComponentFixture<TelemedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelemedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
