import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DupmThisYearComponent } from './dupm-this-year.component';

describe('DupmThisYearComponent', () => {
  let component: DupmThisYearComponent;
  let fixture: ComponentFixture<DupmThisYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DupmThisYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DupmThisYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
