import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilelistComponent } from './tilelist.component';

describe('TilelistComponent', () => {
  let component: TilelistComponent;
  let fixture: ComponentFixture<TilelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
