import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDashboardComponent } from './loader-dashboard.component';

describe('LoaderDashboardComponent', () => {
  let component: LoaderDashboardComponent;
  let fixture: ComponentFixture<LoaderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
