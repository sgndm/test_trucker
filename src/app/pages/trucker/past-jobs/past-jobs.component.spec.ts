import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastJobsComponent } from './past-jobs.component';

describe('PastJobsComponent', () => {
  let component: PastJobsComponent;
  let fixture: ComponentFixture<PastJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
