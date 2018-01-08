import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesManagerComponent } from './notes-manager.component';

describe('NotesManagerComponent', () => {
  let component: NotesManagerComponent;
  let fixture: ComponentFixture<NotesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
