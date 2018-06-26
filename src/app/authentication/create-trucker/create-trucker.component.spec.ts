import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTruckerComponent } from './create-trucker.component';

describe('CreateTruckerComponent', () => {
  let component: CreateTruckerComponent;
  let fixture: ComponentFixture<CreateTruckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTruckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTruckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
