import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StyleGuideComponent } from './style-guide.component';

describe('StyleGuideComponent', () => {
  let component: StyleGuideComponent;
  let fixture: ComponentFixture<StyleGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleGuideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StyleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sections', () => {
    const headers = fixture.debugElement.queryAll(By.css('h2.headline-medium'));
    const sectionTitles = headers.map((h) => h.nativeElement.textContent.trim());

    expect(sectionTitles).toContain('Colors');
    expect(sectionTitles).toContain('Typography');
    expect(sectionTitles).toContain('Elevation');
    expect(sectionTitles).toContain('Shapes');
  });

  it('should render color cards', () => {
    const colorCards = fixture.debugElement.queryAll(By.css('.color-card'));
    expect(colorCards.length).toBeGreaterThan(0);
  });
});
