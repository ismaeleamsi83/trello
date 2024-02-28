import { Component } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  movies = [
    'Crear el proyecto de angular',
    'Crear el componente Header',
    'Agregar el componente Header al componente principal',
    'Maquetar el componente Header',
    'Crear condición sin elegir editar que solo se muestre los datos en el perfil y no pueda modificar los inputs',
  ];  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
