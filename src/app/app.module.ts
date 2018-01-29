import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app.material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AppRoutingModule, ROUTES_PROVIDERS} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotesManagerComponent } from './notes-manager/notes-manager.component';
import {NoteGroupAddComponent} from './note-group/note-group.add.component';
import {NoteGroupRemoveComponent} from './note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from './share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from './note-details/note-details.component';
import {NoteRemoveComponent} from './note-details/note.remove.component';
import {AuthGuard} from "./_guards/AuthGuard";
import {NoteGroupInviteMemberComponent} from "./note-group/note-group.invite-member.component";
import {AlertComponent} from "./_alert/alert.component";
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotesManagerComponent,
    NoteGroupAddComponent,
    NoteGroupRemoveComponent,
    ShareManagerRemoveComponent,
    NoteDetailsComponent,
    NoteRemoveComponent,
    NoteGroupInviteMemberComponent,
    AlertComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
