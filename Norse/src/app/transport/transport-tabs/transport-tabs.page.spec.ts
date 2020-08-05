import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTabsPage } from './transport-tabs.page';

describe('TransportTabsPage', () => {
  let component: TransportTabsPage;
  let fixture: ComponentFixture<TransportTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
