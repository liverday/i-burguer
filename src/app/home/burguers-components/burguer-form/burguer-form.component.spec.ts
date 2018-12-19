import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguerFormComponent } from './burguer-form.component';

describe('BurguerFormComponent', () => {
  let component: BurguerFormComponent;
  let fixture: ComponentFixture<BurguerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurguerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurguerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
