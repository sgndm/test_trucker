import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshYearComponent } from './dsh-year.component';

describe('DshYearComponent', () => {
  let component: DshYearComponent;
  let fixture: ComponentFixture<DshYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
