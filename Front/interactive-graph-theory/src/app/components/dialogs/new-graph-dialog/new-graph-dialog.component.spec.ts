import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGraphDialogComponent } from './new-graph-dialog.component';

describe('NewGraphDialogComponent', () => {
  let component: NewGraphDialogComponent;
  let fixture: ComponentFixture<NewGraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGraphDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
