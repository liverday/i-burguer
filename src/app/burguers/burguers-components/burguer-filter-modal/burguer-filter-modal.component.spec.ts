import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguerFilterModalComponent } from './burguer-filter-modal.component';

describe('BurguerFilterModalComponent', () => {
  let component: BurguerFilterModalComponent;
  let fixture: ComponentFixture<BurguerFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurguerFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurguerFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
