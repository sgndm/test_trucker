import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaterialsComponent } from './update-materials.component';

describe('UpdateMaterialsComponent', () => {
  let component: UpdateMaterialsComponent;
  let fixture: ComponentFixture<UpdateMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
