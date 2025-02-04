import { Routes } from '@angular/router';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { ProductViewComponent } from './shared/components/product-view/product-view.component';
import { CarruselComponent } from './shared/components/carrusel/carrusel.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { GestorProductosComponent } from './components/admin-components/gestor-productos/gestor-productos.component';

export const routes: Routes = [
    {path: "home", component: CarruselComponent},
    {path: "producto/:id", component: ProductViewComponent},
    {path: "catalogo/categoria/:id", component: CatalogoComponent},
    {path: "login", component: LoginComponent},
    {path: "registro", component: FormularioRegistroComponent},
    {path: "admin", component: AdminComponent , children:[
        {path:"productos", component: GestorProductosComponent }
    ]

    },
    {path: "", redirectTo: "login", pathMatch: "full"}
];
