import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderJobComponent } from './loader-job.component';

describe('LoaderJobComponent', () => {
  let component: LoaderJobComponent;
  let fixture: ComponentFixture<LoaderJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
