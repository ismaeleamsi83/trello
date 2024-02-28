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
    "Integrar librerías/frameworks necesarios (por ejemplo, React, Vue.js, Angular)",
    "Optimizar la aplicación para diferentes dispositivos y tamaños de pantalla (responsividad)",
    "Realizar pruebas de rendimiento y depuración",
    "Agregar interactividad y animaciones",
    "Manejar eventos del usuario (clics, teclas, etc.)",
    "Implementar rutas y navegación (si es una aplicación de una sola página)",
    "Optimizar la carga de recursos (imágenes, scripts, etc.)",
    "Asegurar la compatibilidad con diferentes navegadores y versiones",
    "Agregar accesibilidad para usuarios con discapacidades",
    "Implementar validación de formularios",
    "Integrar APIs externas (por ejemplo, APIs REST)",
    "Diseñar y crear componentes reutilizables",
    "Documentar el código para futuras referencias",
    "Realizar pruebas de usabilidad y obtener retroalimentación del usuario",
    "Preparar la aplicación para producción (minificación, concatenación de archivos, etc.)",
    "Desplegar la aplicación en un servidor o plataforma de alojamiento",
    "Configurar herramientas de análisis y monitoreo (por ejemplo, Google Analytics)",
    "Mantener y actualizar la aplicación según sea necesario"
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
