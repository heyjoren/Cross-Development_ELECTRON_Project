import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Options } from './options.page';

const routes: Routes = [
  {
    path: '',
    component: Options,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
