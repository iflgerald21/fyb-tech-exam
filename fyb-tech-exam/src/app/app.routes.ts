import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
// import { MainComponent } from './layouts/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskModalComponent } from './modals/add/add.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'taskList', component: TaskListComponent },
    { path: 'modalAdd', component: AddTaskModalComponent },
    
    // {
    //     path: 'main', component: MainComponent, children: [
    //         // { path: 'members', component: MembersComponent }
    //     ]
    // },
    // { path: '', redirectTo: '/main', pathMatch: 'full' },  // Default redirect to Main
];

@NgModule({
    imports: [RouterModule.forRoot(routes),  ReactiveFormsModule,
    ],
    exports: [RouterModule,]
})
export class AppRoutingModule { }