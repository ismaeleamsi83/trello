import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList, FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  @ViewChild('showElementTask') showElementTask!: ElementRef;

  newArrayList : any = [
    { id:1 , name:"Nuevo elemento", description: "descripcion del primero elemento" },
    { id:2 , name:"Segundo nuevo elemento", description: "descripcion del segundo elemento" }
  ];
  editTaskSelect: any = [{}];
  
  process : any = [];

  done : any = [];

  todo = [
    "Diseñar la estructura de la aplicación",
    "Crear el esqueleto HTML",
    "Estilizar la interfaz de usuario (UI) con CSS",
    "Implementar la lógica de la aplicación con JavaScript",
  ];

  

  

  drop(event: CdkDragDrop<any>) {
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

  editTask(editTask: any){
    console.log("editando tarea: ",  editTask);
    this.showElementTask.nativeElement.classList.remove('hideTask');
    this.showElementTask.nativeElement.classList.add('showTask');
    this.editTaskSelect=editTask;
  }

  closeTask(){
    console.log("cerrando tarea");
    this.showElementTask.nativeElement.classList.remove('showTask');
    this.showElementTask.nativeElement.classList.add('hideTask');
  }

  saveTask(task: any){
    console.log(task);
    this.newArrayList.map((e:any)=>{
      if(e.id == this.editTaskSelect.id ){
          e.name = task.name;
          e.description = task.description;
      }
    });
    this.closeTask();
  }

}
