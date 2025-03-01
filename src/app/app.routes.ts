import { Routes } from '@angular/router';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { ProductViewComponent } from './shared/components/product-view/product-view.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FormularioRegistroComponent } from './shared/components/formulario-registro/formulario-registro.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { GestorProductosComponent } from './components/admin-components/gestor-productos/gestor-productos.component';
import { HomeComponent } from './shared/components/home/home.component';
import { FormularioPagoComponent } from './components/user-components/formulario-pago/formulario-pago.component';
import { compraGuard } from './shared/guards/compra.guard';
import { PerfilComponent } from './components/user-components/perfil/perfil.component';
import { loginGuardGuard } from './shared/guards/login-guard.guard';
import { VerificacionMailComponent } from './components/user-components/verificacion-mail/verificacion-mail.component';
import { PedidosComponent } from './components/user-components/pedidos/pedidos.component';
import { ReseniasComponent } from './components/user-components/resenias/resenias.component';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "mail", component: VerificacionMailComponent},
    {path: "pago", component: FormularioPagoComponent, canActivate: [compraGuard]},
    {path: "producto/:id", component: ProductViewComponent},
    {path: "catalogo/categoria/:id", component: CatalogoComponent},
    {path: "login", component: LoginComponent},
    {path: "registro", component: FormularioRegistroComponent},
    {path: "perfil", component: PerfilComponent, canActivate: [loginGuardGuard]},
    {path: "pedidos", component: PedidosComponent, canActivate: [loginGuardGuard]},
    {path: "resenias", component: ReseniasComponent, canActivate: [loginGuardGuard]},
    {path: "admin", component: AdminComponent , children:[
        {path: "", redirectTo: "productos", pathMatch: "full"},
        {path:"productos", component: GestorProductosComponent }
    ]},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "**", redirectTo: "home"}
];
