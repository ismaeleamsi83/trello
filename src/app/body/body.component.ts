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


  todo = [
    "primero",
    "segundo",
    "tercero"
  ];

  progress = [
    "primero progress",
    "segundo progress",
    "tercero progress"
  ];

  // data = [
  //   this.todo,
  //   this.progress
  // ];

  data = [
    { name: "titulo de la lista", data:  this.todo },
    { name: "otro titulo", data: this.progress}
  ];

  idListCount = 0;


  //nuevo crear nueva lista
  idNewList: number = 0;
  newListArray: any = [];


  newArrayList : any = [
    { id:0 , name:"Nuevo elemento", description: "descripcion del primero elemento" },
    { id:1 , name:"Segundo nuevo elemento", description: "descripcion del segundo elemento" }
  ];

  editIdList: any;
  editId: any;
  editName: any;
  editDescription: any;

  
  newArrayList2 : any = [
    [
      {id:'0', name: "nombre uno", description: "descripcion de la primera lista"},
      {id:'1', name: "nombre dos", description: "descripcion de la primera lista"}
    ],
    [
      {id:'0', name: "nombre uno de dos", description: "descripcion de la segunda lista"},
      {id:'1', name: "nombre dos de dos", description: "descripcion de la segunda lista"}
    ]
  ];

  newArrayList5 : any = [
    {id:'0', idList: 0, name: "nombre lista 0", description: "descripcion de la primera lista"},
    {id:'1', idList: 1, name: "nombre lista 1", description: "descripcion de la primera lista"}
  ];

  indiceList : any = [
    0,
    1
  ]

  
  ngOnInit(): void {
   
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
  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.newArrayList5, event.previousIndex, event.currentIndex);
  }

  editTask(editTask: any, indice: number){
    console.log("editando tarea: ",  editTask);
    this.showElementTask.nativeElement.classList.remove('hideTask');
    this.showElementTask.nativeElement.classList.add('showTask');
    
    this.editIdList = indice;
    this.editId = editTask.id;
    this.editName = editTask.name;
    this.editDescription = editTask.description;
  }

  closeTask(){
    console.log("cerrando tarea");
    this.showElementTask.nativeElement.classList.remove('showTask');
    this.showElementTask.nativeElement.classList.add('hideTask');
  }

  saveTask(){
    
    // this.newArrayList.map((e:any)=>{
    //   if(e.id == this.editId ){
    //       e.name = this.editName;
    //       e.description = this.editDescription;
    //   }
    // });
    for(let i = 0; i <  this.newArrayList2.length;i++){
      if(i ==  this.editIdList){
        console.log("adentro del array", this.editIdList);
        this.newArrayList2[i].map((e:any)=>{
            if(e.id == this.editId ){
                e.name = this.editName;
                e.description = this.editDescription;
            }
          });
      }
    }
    this.closeTask();
  }


  newTask(idList: any){
    console.log("crear nueva tarea");
    console.log(idList);
    
    this.data.forEach((element:any, index) => {
      
      if (index === idList){
        console.log("ok");
        console.log(element.data);
        element.data.push("Nueva Tarea");
      }
      
      
    });
  }







  newList(){
    const otherList = [
      "nueva",
      "otro"
    ];

    const newList = [
      { name: "titulo de otra lista", data:  otherList }
    ]
    
    this.data.push({ name: "titulo de otra lista", data:  otherList});
    console.log(newList);
    this.idListCount++;
  }


  removeList(indice: any){
    this.data.splice(indice,1);
    console.log(indice);
  }

}
