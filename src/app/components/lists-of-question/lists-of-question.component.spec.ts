import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsOfQuestionComponent } from './lists-of-question.component';

describe('ListsOfQuestionComponent', () => {
  let component: ListsOfQuestionComponent;
  let fixture: ComponentFixture<ListsOfQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsOfQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsOfQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
