import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguersPage } from './burguers.page';

describe('BurguersPage', () => {
  let component: BurguersPage;
  let fixture: ComponentFixture<BurguersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurguersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurguersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
