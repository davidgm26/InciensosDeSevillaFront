import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReseniaResponse } from '../../../shared/models/resenia-response.interface';
import { ReseniaService } from '../../../shared/services/resenia.service';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { ReseniaItemComponent } from './resenia-item/resenia-item.component';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
    selector: 'app-resenias',
    templateUrl: './resenias.component.html',
    styleUrls: ['./resenias.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RatingModule,
        DialogModule,
        ButtonModule,
        ToastModule,
        NavbarComponent,
        ReseniaItemComponent,
        SpinnerComponent
    ]
})
export class ReseniasComponent implements OnInit {
    resenias!: ReseniaResponse[];
    totalResenias: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;
    dialogVisible: boolean = false;
    reseniaSeleccionada!: ReseniaResponse;

    constructor(
        private reseniaService: ReseniaService
    ) { }

    ngOnInit(): void {
        this.cargarResenias();
    }

    cargarResenias() {
        this.reseniaService.obtenerReseniasDeUnUsuario().subscribe({
            next: (res) => {
                this.resenias = res;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
