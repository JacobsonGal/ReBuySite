import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCounterComponent } from './users-counter.component';

describe('UsersCounterComponent', () => {
  let component: UsersCounterComponent;
  let fixture: ComponentFixture<UsersCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
