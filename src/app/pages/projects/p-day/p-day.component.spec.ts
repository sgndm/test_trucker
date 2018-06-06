import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDayComponent } from './p-day.component';

describe('PDayComponent', () => {
  let component: PDayComponent;
  let fixture: ComponentFixture<PDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
