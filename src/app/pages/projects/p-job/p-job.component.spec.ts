import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PJobComponent } from './p-job.component';

describe('PJobComponent', () => {
  let component: PJobComponent;
  let fixture: ComponentFixture<PJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
