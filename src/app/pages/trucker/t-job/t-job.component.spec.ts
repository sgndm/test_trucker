import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TJobComponent } from './t-job.component';

describe('TJobComponent', () => {
  let component: TJobComponent;
  let fixture: ComponentFixture<TJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
