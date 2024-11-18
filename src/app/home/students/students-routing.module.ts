import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'studentAdd',
    component: StudentFormComponent
  },
  {
    path: 'studentEdit',
    component: StudentFormComponent
  },
  {
    path: 'studentView',
    component: StudentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
