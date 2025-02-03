import { Routes } from '@angular/router';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { ProductViewComponent } from './shared/components/product-view/product-view.component';
import { CarruselComponent } from './shared/components/carrusel/carrusel.component';
import { SmallProductCardComponent } from './shared/components/small-product-card/small-product-card.component';

export const routes: Routes = [
    {path: "home", component: CarruselComponent},
    {path: "producto/:id", component: ProductViewComponent},
    {path: "catalogo/categoria/:id", component: CatalogoComponent},
    {path: "", redirectTo: "home", pathMatch: "full"}
];
