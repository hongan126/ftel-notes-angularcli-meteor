import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NotesManagerComponent} from './notes-manager/notes-manager.component';
import {NoteGroupAddComponent} from './note-group/note-group.add.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: '', component: NotesManagerComponent, canActivate:[AuthGuard]}
  {path: 'signup', component: SignupComponent},
  {path: 'notes', component: NotesManagerComponent},
  {path: 'group-add', component: NoteGroupAddComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
