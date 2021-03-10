import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGraphDialogComponent } from './load-graph-dialog.component';

describe('LoadGraphDialogComponent', () => {
  let component: LoadGraphDialogComponent;
  let fixture: ComponentFixture<LoadGraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadGraphDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
