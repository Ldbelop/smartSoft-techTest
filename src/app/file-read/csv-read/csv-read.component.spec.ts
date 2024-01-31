import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvReadComponent } from './csv-read.component';

describe('CsvReadComponent', () => {
  let component: CsvReadComponent;
  let fixture: ComponentFixture<CsvReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsvReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CsvReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
