import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBoughtComponent } from './tag-bought.component';

describe('TagBoughtComponent', () => {
  let component: TagBoughtComponent;
  let fixture: ComponentFixture<TagBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagBoughtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
