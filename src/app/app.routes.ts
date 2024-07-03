import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: '',
        component: MainPageComponent
    }
];
