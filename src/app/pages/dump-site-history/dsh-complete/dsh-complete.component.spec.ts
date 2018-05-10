import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DshCompleteComponent } from './dsh-complete.component';

describe('DshCompleteComponent', () => {
  let component: DshCompleteComponent;
  let fixture: ComponentFixture<DshCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DshCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DshCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
