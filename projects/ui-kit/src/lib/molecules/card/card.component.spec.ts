import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardVariant, QuantaCardComponent } from './card.component';

@Component({
  imports: [QuantaCardComponent],
  template: `
    <quanta-card [variant]="variant">
      <div header>Header Content</div>
      <div media>Media Content</div>
      <div>Main Content</div>
      <div actions>Actions Content</div>
    </quanta-card>
  `,
})
class TestHostComponent {
  variant: CardVariant = 'elevated';
}

describe('QuantaCardComponent', () => {
  let component: QuantaCardComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaCardComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(QuantaCardComponent)).componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have default variant', () => {
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.quanta-card'));
    expect(cardEl.nativeElement.classList).toContain('elevated');
  });

  it('should apply variant class', () => {
    fixture.componentInstance.variant = 'outlined';
    fixture.detectChanges();
    const cardEl = fixture.debugElement.query(By.css('.quanta-card'));
    expect(cardEl.nativeElement.classList).toContain('outlined');
  });

  it('should project content correctly', () => {
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('.card-header'));
    expect(header.nativeElement.textContent).toContain('Header Content');

    const media = fixture.debugElement.query(By.css('.card-media'));
    expect(media.nativeElement.textContent).toContain('Media Content');

    const content = fixture.debugElement.query(By.css('.card-content'));
    expect(content.nativeElement.textContent).toContain('Main Content');

    const actions = fixture.debugElement.query(By.css('.card-actions'));
    expect(actions.nativeElement.textContent).toContain('Actions Content');
  });
});
