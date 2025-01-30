import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  listaCategoria: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias(){
    return this.categoriaService.getAllCategorias().subscribe(
      (res) => {
        this.listaCategoria = res;
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
