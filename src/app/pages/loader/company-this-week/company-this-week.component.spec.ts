import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyThisWeekComponent } from './company-this-week.component';

describe('CompanyThisWeekComponent', () => {
  let component: CompanyThisWeekComponent;
  let fixture: ComponentFixture<CompanyThisWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyThisWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyThisWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
