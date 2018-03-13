import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatTextareaAutosize,
  MatToolbarModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CdkTableModule,
    MatRadioModule,
    MatTextareaAutosize,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule
  ],
})
export class AppMaterialModule {
}
