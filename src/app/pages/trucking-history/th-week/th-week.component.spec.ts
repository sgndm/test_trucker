import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThWeekComponent } from './th-week.component';

describe('ThWeekComponent', () => {
  let component: ThWeekComponent;
  let fixture: ComponentFixture<ThWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
