import {Routes} from '@angular/router';
import {MainComponent} from './shared-components/layout/main/main.component';
import {HomeComponent} from './use-cases/home/home.component';
import {AboutComponent} from './use-cases/about/about.component';
import {SupportComponent} from './documentation/support/support.component';
import {LoginComponent} from './use-cases/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      subtitle: 'Sign in with your authorization credentials',
    },
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {
        path: 'home', component: HomeComponent,
        data: {
          title: 'Home', subtitle: 'Dashboard', layout: 'expanded'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About', subtitle: 'Subtitle About'
        }
      },
      {
        path: 'support',
        component: SupportComponent,
        data: {
          title: 'Technical Support',
          subtitle: 'How use resources into project',
          dynamicValue: 'specific value configuration'
        }
      },
    ],
  },
  {path: '**', redirectTo: '/home'},
];
