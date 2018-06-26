import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpCompaniesComponent } from './dump-companies.component';

describe('DumpCompaniesComponent', () => {
  let component: DumpCompaniesComponent;
  let fixture: ComponentFixture<DumpCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumpCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
