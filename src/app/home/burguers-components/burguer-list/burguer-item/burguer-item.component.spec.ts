import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguerItemComponent } from './burguer-item.component';

describe('BurguerItemComponent', () => {
  let component: BurguerItemComponent;
  let fixture: ComponentFixture<BurguerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurguerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurguerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
