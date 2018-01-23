import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NotesManagerComponent} from './notes-manager/notes-manager.component';
import {NoteGroupAddComponent} from './note-group/note-group.add.component';
import {NoteGroupRemoveComponent} from './note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from './share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from './note-details/note-details.component';
import {NoteRemoveComponent} from './note-details/note.remove.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: '', component: NotesManagerComponent},
  // canActivate:[AuthGuard]
  {path: 'signup', component: SignupComponent},
  {path: 'notes', component: NotesManagerComponent},
  {path: 'group-add', component: NoteGroupAddComponent},
  {path: 'group-remove', component: NoteGroupRemoveComponent},
  {path: 'share-remove', component: ShareManagerRemoveComponent},
  {path: 'note-details', component: NoteDetailsComponent},
  {path: 'note-remove', component: NoteRemoveComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
