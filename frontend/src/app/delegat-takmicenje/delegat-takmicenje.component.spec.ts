import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatTakmicenjeComponent } from './delegat-takmicenje.component';

describe('DelegatTakmicenjeComponent', () => {
  let component: DelegatTakmicenjeComponent;
  let fixture: ComponentFixture<DelegatTakmicenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatTakmicenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatTakmicenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
