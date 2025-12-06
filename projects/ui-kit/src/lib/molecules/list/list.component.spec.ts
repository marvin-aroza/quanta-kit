import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaListItemComponent } from './list-item.component';
import { QuantaListComponent } from './list.component';

describe('QuantaListItemComponent', () => {
  let fixture: ComponentFixture<QuantaListItemComponent>;
  let component: QuantaListItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have listitem role on host', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.getAttribute('role')).toBe('listitem');
  });

  it('should apply disabled class', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.classList.contains('disabled')).toBe(true);
  });

  it('should not be interactive by default', () => {
    const content = fixture.debugElement.query(By.css('.quanta-list-item-content'));
    expect(content.classes['interactive']).toBeFalsy();
    expect(content.nativeElement.getAttribute('role')).toBeNull();
  });

  it('should apply interactive class and button role when enabled', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.quanta-list-item-content'));
    expect(content.classes['interactive']).toBe(true);
    expect(content.nativeElement.getAttribute('role')).toBe('button');
  });
});

describe('QuantaListComponent', () => {
  let fixture: ComponentFixture<QuantaListComponent>;
  let component: QuantaListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct host class', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.classList.contains('quanta-list')).toBe(true);
  });
});
