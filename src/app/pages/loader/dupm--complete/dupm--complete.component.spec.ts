import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DupmCompleteComponent } from './dupm--complete.component';

describe('DupmCompleteComponent', () => {
  let component: DupmCompleteComponent;
  let fixture: ComponentFixture<DupmCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DupmCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DupmCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
