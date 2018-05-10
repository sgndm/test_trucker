import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThYearComponent } from './th-year.component';

describe('ThYearComponent', () => {
  let component: ThYearComponent;
  let fixture: ComponentFixture<ThYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
