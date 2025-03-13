import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraflowComponent } from './draflow.component';

describe('DraflowComponent', () => {
  let component: DraflowComponent;
  let fixture: ComponentFixture<DraflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
