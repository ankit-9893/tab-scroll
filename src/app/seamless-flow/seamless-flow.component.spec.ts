import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeamlessFlowComponent } from './seamless-flow.component';

describe('SeamlessFlowComponent', () => {
  let component: SeamlessFlowComponent;
  let fixture: ComponentFixture<SeamlessFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeamlessFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeamlessFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
