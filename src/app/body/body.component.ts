import { Tasklist } from '../interfaces/tasklist';
import { Taskarray } from '../interfaces/taskarray';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDrag,CdkDropList, CdkDragDrop,CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { FormsModule } from '@angular/forms';
import { concat } from 'rxjs';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CdkDrag, CdkDropList, FormsModule, CdkDropListGroup],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {

  @ViewChild('showElementTask') showElementTask!: ElementRef;
  @ViewChild('nameList') nameList!: ElementRef;

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
  


  //nuevo crear nueva lista
  idNewList: number = 0;
  newListArray: any = [];


  newArrayList : any = [
    { id:0 , name:"Nuevo elemento", description: "descripcion del primero elemento" },
    { id:1 , name:"Segundo nuevo elemento", description: "descripcion del segundo elemento" }
  ];

  editIdList: any;
  editIdTask: any;
  editName: any;
  editDescription: any;

  
  

  indiceList : any = [
    0,
    1
  ]

  
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
    console.log("id List: ",  idList);
    console.log("id Task: ", indice);
    this.showElementTask.nativeElement.classList.remove('hideTask');
    this.showElementTask.nativeElement.classList.add('showTask');
    
    console.log(this.data[idList].data[indice]);
    this.editName = this.data[idList].data[indice];
    this.editIdList = idList;
    this.editIdTask = indice;
    // this.editIdList = indice;
    // this.editId = editTask.id;
    // this.editName = editTask.name;
    // this.editDescription = editTask.description;
  }

  closeTask(){
    console.log("cerrando tarea");
    this.showElementTask.nativeElement.classList.remove('showTask');
    this.showElementTask.nativeElement.classList.add('hideTask');
  }

  saveTask(){
    this.data[this.editIdList].data[this.editIdTask] = this.editName;
    this.closeTask();
  }








  removeTask(idList:any, idItem: any){
    this.data[idList].data.splice(idItem,1);
  }

  newTask(idList: any){
    this.data.forEach((element:any, index) => {
      if (index === idList){
        element.data.push("Nueva Tarea");
      }
    });
  }

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
    console.log(idList);
    console.log(this.nameList.nativeElement.value);
    this.data[idList].name = this.nameList.nativeElement.value;   
  }

  removeList(indice: any){
    this.data.splice(indice,1);
    this.clickEditList.splice(indice, 1);
  }

}
