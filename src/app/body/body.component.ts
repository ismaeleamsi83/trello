import { Tasklist } from '../interfaces/tasklist';
import { Taskarray } from '../interfaces/taskarray';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop,CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { FormsModule } from '@angular/forms';
import { concat } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList, FormsModule, CdkDropListGroup, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {

  @ViewChild('showElementTask') showElementTask!: ElementRef;
  @ViewChild('nameList') nameList!: ElementRef;
  @ViewChild('removeTaskAnimate') removeTaskAnimate!: ElementRef;

  todo = [
    "Diseñar la estructura de navegación.",
    "Seleccionar las tecnologías y herramientas que se utilizarán.",
    "Crear wireframes y prototipos de la interfaz de usuario."
  ];

  progress = [
    "Configurar el entorno de desarrollo.",
    "Desarrollar la navegación.",
    "Desarrollar la autenticación de usuarios."
  ];


  data = [
    { name: "Lista de tareas", data:  this.todo },
    { name: "En progreso", data: this.progress}
  ];

  idListCount = 0;

  
  clickEditList = [
    false,
    false
  ]
  
  // Editar
  editIdList: any;
  editIdTask: any;
  editName: any;
  editDescription: any;

  // Animar eliminar lista
  isClicked: boolean = false;
  clickedList: number = -1;

  // Animar eliminar tarea
  isClickedTask: boolean = false;
  clickedTask: number = -1;
  clickedListTask: number = -1;
  
  
  ngOnInit(): void {
   
  }

  onDrop(event: CdkDragDrop<any>) {
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
  

  editTask(idList: any, indice: number){
    
    this.showElementTask.nativeElement.classList.remove('hideTask');
    this.showElementTask.nativeElement.classList.add('showTask');
    
    
    this.editName = this.data[idList].data[indice];
    this.editIdList = idList;
    this.editIdTask = indice;
    // this.editIdList = indice;
    // this.editId = editTask.id;
    // this.editName = editTask.name;
    // this.editDescription = editTask.description;
  }

  closeTask(){
    
    this.showElementTask.nativeElement.classList.remove('showTask');
    this.showElementTask.nativeElement.classList.add('hideTask');
  }

  //Crud de tareas
  saveTask(){
    this.data[this.editIdList].data[this.editIdTask] = this.editName;
    this.closeTask();
  }

  removeTask(idList:any, idItem: any){
    this.removeTaskAnimate.nativeElement.classList.remove('click-animation-insert-task');
    
    this.isClickedTask = true;
    this.clickedListTask = idList;
    this.clickedTask = idItem;
    setTimeout(() => {
      
      this.isClickedTask = false;
      this.clickedListTask = -1;
      this.clickedTask = -1;
      this.data[idList].data.splice(idItem,1);
    }, 500);
    
  }

  newTask(idList: any){
    this.data.forEach((element:any, index) => {
      if (index === idList){
        element.data.push("Nueva Tarea");
      }
    });
  }


  //Crud de listas
  newList(){
    const otherList = [
      "Nueva Tarea",
      "Nueva Tarea"
    ];
    this.clickEditList.push(false);
    this.data.push({ name: "Nueva lista", data:  otherList});
    this.idListCount++;
  }

  saveList(idList: any){
    this.data[idList].name = this.nameList.nativeElement.value;   
  }

  removeList(indice: any){
    this.isClicked = true;
    this.clickedList = indice;
    setTimeout(() => {
      this.isClicked= false;
      this.clickedList = -1;
      this.data.splice(indice,1);
      this.clickEditList.splice(indice, 1);
    }, 500);
  }

}
