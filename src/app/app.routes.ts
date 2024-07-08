import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';
import { TableUserComponent } from './main-page/table-user/table-user.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'mainPage',
        component: MainPageComponent
    },
    {
        path: 'details/login',
        component: TableUserComponent
    }

];
