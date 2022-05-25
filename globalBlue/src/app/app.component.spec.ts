import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonToggleModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDividerModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        BrowserModule,
        FormsModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain(
      'Tax Calculator'
    );
  });

  it('should return form on initForm', async () => {
    await expect(app.initForm().value).toEqual(app.form.value);
  });

  it('should change net and gross values when value type is vat', async () => {
    app.valueChanged(10, app.valueType.VAT);
    await expect(
      +app.form.get('net')?.value + +app.form.get('gross')?.value
    ).toBeGreaterThan(0);
  });

  it('should change vat and gross values when value type is net', async () => {
    app.valueChanged(10, app.valueType.NET);
    await expect(
      +app.form.get('vat')?.value + +app.form.get('gross')?.value
    ).toBeGreaterThan(0);
  });

  it('should change vat and net values when value type is gross', async () => {
    app.valueChanged(10, app.valueType.GROSS);
    await expect(
      +app.form.get('vat')?.value + +app.form.get('net')?.value
    ).toBeGreaterThan(0);
  });
});
