import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpeopleComponent } from './allpeople.component';

describe('AllpeopleComponent', () => {
  let component: AllpeopleComponent;
  let fixture: ComponentFixture<AllpeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllpeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
