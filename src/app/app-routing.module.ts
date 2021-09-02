import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { ListsOfQuestionComponent } from './components/lists-of-question/lists-of-question.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';

const routes: Routes = [
  { path: '', component: QuestionManagementComponent},
  { path: 'new', component: CreateQuestionComponent },
  { path: 'edit/:id', component: EditQuestionComponent},
  { path: 'lists', component: ListsOfQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
