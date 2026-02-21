import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlanner } from './map-planner';

describe('MapPlanner', () => {
  let component: MapPlanner;
  let fixture: ComponentFixture<MapPlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPlanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPlanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
