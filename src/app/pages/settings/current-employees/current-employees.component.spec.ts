import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEmployeesComponent } from './current-employees.component';

describe('CurrentEmployeesComponent', () => {
  let component: CurrentEmployeesComponent;
  let fixture: ComponentFixture<CurrentEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
