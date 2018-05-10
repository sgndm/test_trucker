import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshWeekComponent } from './dsh-week.component';

describe('DshWeekComponent', () => {
  let component: DshWeekComponent;
  let fixture: ComponentFixture<DshWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
