import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  @ViewChild('showElementTask') showElementTask!: ElementRef;

  nameTask: any;


  todo = [
    "Diseñar la estructura de la aplicación",
    "Crear el esqueleto HTML",
    "Estilizar la interfaz de usuario (UI) con CSS",
    "Implementar la lógica de la aplicación con JavaScript",
  ];

  process : any = [];

  done : any = [];

  newArrayList : any = [
    { id:1 , name:"Nuevo elemento" }
  ];

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

  editTask(nameTask: any){
    console.log("editando tarea: ",  nameTask);
    this.showElementTask.nativeElement.classList.remove('hideTask');
    this.showElementTask.nativeElement.classList.add('showTask');
    this.nameTask=nameTask;
  }

  closeTask(){
    console.log("cerrando tarea");
    this.showElementTask.nativeElement.classList.remove('showTask');
    this.showElementTask.nativeElement.classList.add('hideTask');
  }

}
