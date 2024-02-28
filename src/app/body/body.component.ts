import { Component } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  todo = [
    "Diseñar la estructura de la aplicación",
    "Crear el esqueleto HTML",
    "Estilizar la interfaz de usuario (UI) con CSS",
    "Implementar la lógica de la aplicación con JavaScript",
  ];

  process : any = [];

  done : any = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
