import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoaderComponent } from './create-loader.component';

describe('CreateLoaderComponent', () => {
  let component: CreateLoaderComponent;
  let fixture: ComponentFixture<CreateLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
