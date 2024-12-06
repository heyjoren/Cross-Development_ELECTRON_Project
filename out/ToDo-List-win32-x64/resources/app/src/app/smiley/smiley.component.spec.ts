import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmileyComponent } from './smiley.component';

describe('SmileyComponent', () => {
  let component: SmileyComponent;
  let fixture: ComponentFixture<SmileyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SmileyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmileyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
