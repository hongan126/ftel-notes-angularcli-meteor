import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule
  ],
})
export class AppMaterialModule {
}
