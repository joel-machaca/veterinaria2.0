import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './pages/public/home/home';
import { Servicios } from './pages/public/servicios/servicios';

import { ClienteLayout } from './layouts/cliente-layout/cliente-layout';
import { PetsList } from './pages/cliente/pets/petsList/petsList';
import { Profile } from './pages/cliente/profile/profile';
import { AppointmentsForm } from './pages/cliente/appointments/appointmentsForm/appointmentsForm';
import { AppointmentsList } from './pages/cliente/appointments/appointmentsList/appointmentsList';
import { PetsForm } from './pages/cliente/pets/petsForm/petsForm';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Historial } from './pages/admin/historial/historial';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { PetsListAdmin } from './pages/admin/petsList/petsListAdmin';
import { CitasAdmin } from './pages/admin/citas/citasAdmin';



export const routes: Routes = [

    {
        path:"",
        component:PublicLayout,
        children:[
            {path:"",component:Home},
            { path: 'servicios', component: Servicios },
            { path: 'login', component:  Login},
            { path: 'register', component:  Register},
        ]
    },

    {
        path:"cliente",
        component:ClienteLayout,
        canActivate: [authGuard],
        children:[
            {path:"mascotas",component:PetsList},
            { path: 'mascota/nueva', component: PetsForm },
            { path: 'cita', component: AppointmentsList },
            { path: 'cita/nueva', component: AppointmentsForm },
            { path: 'perfil', component: Profile },
        ]
    },
    {
        path:"admin",
        component:AdminLayout,
        canActivate: [adminGuard],
        children:[
            {path:'mascotas',component:PetsListAdmin},
            { path: 'pendiente', component: CitasAdmin },
            { path: 'historial', component: Historial },
        ]
    }
];
