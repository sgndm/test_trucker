import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayJobsComponent } from './today-jobs.component';

describe('TodayJobsComponent', () => {
  let component: TodayJobsComponent;
  let fixture: ComponentFixture<TodayJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
