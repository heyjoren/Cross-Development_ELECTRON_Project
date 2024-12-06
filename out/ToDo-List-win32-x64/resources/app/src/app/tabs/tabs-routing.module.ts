import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('../overview/overview.module').then(m => m.OverviewPageModule)
      },
      {
        path: 'add-task',
        loadChildren: () => import('../add-task/add-task.module').then(m => m.AddTaskPageModule)
      },
      {
        path: 'options',
        loadChildren: () => import('../options/options.module').then(m => m.OptionsPageModule)
      },
      {
        path: '**',
        redirectTo: '/tab/overview',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
