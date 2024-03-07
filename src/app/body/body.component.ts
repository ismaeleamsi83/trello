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


  todoArray = [
    {title: "Configurar el entorno de desarrollo.", description: "Preparar las herramientas y configuraciones necesarias para desarrollar software de manera eficiente y efectiva. Esto incluye la instalación y configuración de editores de código, entornos de ejecución, herramientas de control de versiones, dependencias y cualquier otro software relevante para el proyecto.", comment: ["comentario de prueba"]},
    {title: "Diseñar la estructura de navegación.", description: "Crear un plano o mapa que define cómo los usuarios interactuarán y se moverán a través de un sistema, aplicación web o sitio web. Esto incluye la organización y disposición de los elementos de navegación, como menús, enlaces, botones y otras herramientas de navegación. ", comment: ["comentario de prueba"]},
    {title: "Desarrollar la autenticación de usuarios.", description: "Implementar un sistema que permita a los usuarios confirmar su identidad antes de acceder a recursos o funcionalidades de una aplicación o sistema. Este proceso generalmente incluye la creación de formularios de inicio de sesión donde los usuarios ingresan sus credenciales (como nombre de usuario y contraseña) y la validación de estas credenciales contra una base de datos segura.", comment: ["comentario de prueba"]}
  ];

  // Este funciona
  // data = [
  //   { name: "Lista de tareas", data:  this.todo},
  //   { name: "En progreso", data: this.progress}
  // ];

  // Probar este

  data = [
      { name: "Lista de tareas", data:  this.todoArray}
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
  editComments: any = [];
  newComment: any;

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
    
    
    this.editName = this.data[idList].data[indice].title;
    this.editDescription = this.data[idList].data[indice].description;
    this.editComments =  this.data[idList].data[indice].comment;
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
    this.data[this.editIdList].data[this.editIdTask].title = this.editName;
    this.data[this.editIdList].data[this.editIdTask].description = this.editDescription;
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
        element.data.push({title: "nueva tarea", description: "nueva descripcion", comment: ["comentario de prueba"]});
      }
    });
  }

  addNewComment(){
    this.data[this.editIdList].data[this.editIdTask].comment.push(this.newComment);
    this.newComment = "";
  }


  //Crud de listas
  newList(){
    const otherList = [
      {title: "Configurar nuevo el entorno de desarrollo.", description: "aqui va la descripcion nuevoo", comment: ["comentario de prueba"]},
    ];
    this.clickEditList.push(false);
  //   this.data.push({ name: "Nueva lista", data:  otherList});
    this.idListCount++;
    this.data.push({ name: "Nueva de tareas", data:  otherList });
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
