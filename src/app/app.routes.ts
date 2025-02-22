import { Routes } from '@angular/router';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { ProductViewComponent } from './shared/components/product-view/product-view.component';
import { CarruselComponent } from './shared/components/carrusel/carrusel.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FormularioRegistroComponent } from './shared/components/formulario-registro/formulario-registro.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { GestorProductosComponent } from './components/admin-components/gestor-productos/gestor-productos.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ComentarioComponent } from './shared/components/comentario/comentario.component';
import { FormularioPagoComponent } from './components/user-components/formulario-pago/formulario-pago.component';
import { compraGuard } from './shared/guards/compra.guard';
import { FilaResumenComponent } from './components/user-components/filaResumen/filaResumen.component';
import { VerificacionMailComponent } from './components/user-components/verificacion-mail/verificacion-mail.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "mail", component: VerificacionMailComponent},
    {path: "pago", component: FormularioPagoComponent, canActivate: [compraGuard]},
    {path: "producto/:id", component: ProductViewComponent},
    {path: "catalogo/categoria/:id", component: CatalogoComponent},
    {path: "login", component: LoginComponent},
    {path: "comentario", component: ComentarioComponent},
    {path: "registro", component: FormularioRegistroComponent},
    {path: "admin", component: AdminComponent , children:[
        {path: "", redirectTo: "productos", pathMatch: "full"},
        {path:"productos", component: GestorProductosComponent }
    ]},
    {path: "", redirectTo: "home", pathMatch: "full"}
];
