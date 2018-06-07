import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCustomersComponent } from './current-customers.component';

describe('CurrentCustomersComponent', () => {
  let component: CurrentCustomersComponent;
  let fixture: ComponentFixture<CurrentCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
