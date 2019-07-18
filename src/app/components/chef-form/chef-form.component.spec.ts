import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefFormComponent } from './chef-form.component';

describe('ChefFormComponent', () => {
  let component: ChefFormComponent;
  let fixture: ComponentFixture<ChefFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
