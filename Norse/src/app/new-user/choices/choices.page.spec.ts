import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesPage } from './choices.page';

describe('ChoicesPage', () => {
  let component: ChoicesPage;
  let fixture: ComponentFixture<ChoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
