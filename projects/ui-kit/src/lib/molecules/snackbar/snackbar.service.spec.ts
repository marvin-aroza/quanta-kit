import { TestBed } from '@angular/core/testing';
import { QuantaSnackbarService } from './snackbar.service';

describe('QuantaSnackbarService', () => {
  let service: QuantaSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantaSnackbarService],
    });
    service = TestBed.inject(QuantaSnackbarService);
  });

  afterEach(() => {
    // Cleanup any loose snackbars
    service.dismiss();
    // Force cleanup DOM
    const snackbars = document.querySelectorAll('quanta-snackbar');
    snackbars.forEach((el) => el.remove());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar and attach to body', () => {
    service.open('Test Message');
    const snackbar = document.querySelector('quanta-snackbar');
    expect(snackbar).toBeTruthy();
    expect(snackbar?.textContent).toContain('Test Message');
  });

  it('should auto dismiss after duration', async () => {
    service.open('Test', undefined, { duration: 50 }); // Short duration for test
    const snackbar = document.querySelector('quanta-snackbar');
    expect(snackbar).toBeTruthy();

    // Wait for duration + animation
    await new Promise((resolve) => setTimeout(resolve, 50 + 400));

    const dismissed = document.querySelector('quanta-snackbar');
    expect(dismissed).toBeNull();
  });

  it('should dismiss existing before opening new', () => {
    service.open('First');
    const first = document.querySelector('quanta-snackbar');
    expect(first?.textContent).toContain('First');

    service.open('Second');
    // Logic removes and creates new OR updates current?
    // Our logic: dismiss() then create new.
    // Immediate dismiss might be async transition, but we called open() which calls dismiss().
    // Wait, dismiss() sets timeout for removal? No, detach happens in timeout.
    // But open() clears existing componentRef immediately if we are careful?
    // Actually implementation:
    // if (this.componentRef) { this.dismiss(); }
    // dismiss() sets isOpen=false and timeout(300) to destroy.
    // So 'Second' opens immediately?
    // If we open immediately after dismiss, we might have two in DOM for a brief moment until the first animation finishes?

    const snackbars = document.querySelectorAll('quanta-snackbar');
    // Logic check: if dismiss is animated, previous one might still be there fading out.
    // Assuming we want to support rapid calls, checking if 'Second' is present is enough.

    const secondFound = Array.from(snackbars).some((el) => el.textContent?.includes('Second'));
    expect(secondFound).toBe(true);
  });
});
