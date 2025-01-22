import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickstockComponent } from './clickstock.component';

describe('ClickstockComponent', () => {
  let component: ClickstockComponent;
  let fixture: ComponentFixture<ClickstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickstockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
