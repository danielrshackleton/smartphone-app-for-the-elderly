import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyDetailsPage } from './journey-details.page';

describe('JourneyDetailsPage', () => {
  let component: JourneyDetailsPage;
  let fixture: ComponentFixture<JourneyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
