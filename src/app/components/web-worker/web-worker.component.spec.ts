import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebWorkerComponent } from './web-worker.component';

describe('WebWorkerComponent', () => {
  let component: WebWorkerComponent;
  let fixture: ComponentFixture<WebWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
