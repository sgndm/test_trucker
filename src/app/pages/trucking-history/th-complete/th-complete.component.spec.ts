import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThCompleteComponent } from './th-complete.component';

describe('ThCompleteComponent', () => {
  let component: ThCompleteComponent;
  let fixture: ComponentFixture<ThCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
