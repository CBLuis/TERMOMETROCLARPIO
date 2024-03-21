import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  temperature: number = 0; // Definir la propiedad temperature
  inputTemperature: number = 0; // Definir la propiedad inputTemperature para almacenar el valor ingresado

  // Método para actualizar la temperatura
  updateTemperature(event: CustomEvent) {
    this.temperature = event.detail.value;
    this.updateMercuryColor(); // Actualizar el color de la barra de mercurio
  }

  // Método para actualizar la temperatura cuando se ingresa un nuevo valor
  setTemperature() {
    if (this.inputTemperature >= 0 && this.inputTemperature <= 100) {
      this.temperature = this.inputTemperature;
      this.updateMercuryColor(); // Actualizar el color de la barra de mercurio
    } else {
      // Manejar el caso en que el valor ingresado esté fuera del rango permitido
      console.log("Ingrese un valor entre 0 y 100");
    }
  }

  // Método para actualizar el color y la altura de la barra de mercurio
  updateMercuryColor() {
    const mercuryElement = document.querySelector('.mercury') as HTMLElement;
    const containerHeight = 300; // Altura del contenedor del termómetro (en píxeles)

    // Calcular la altura del mercurio proporcional al valor de la temperatura
    let mercuryHeight = (this.temperature / 100) * containerHeight;

    // Ajustar la altura mínima del mercurio para que siempre se muestre un poco incluso si la temperatura es 0
    mercuryHeight = Math.max(mercuryHeight, 10); // Altura mínima de 10 píxeles

    // Limitar la altura máxima del mercurio al tamaño del contenedor
    mercuryHeight = Math.min(mercuryHeight, containerHeight);

    // Calcular el color de la barra de mercurio
    let color: string;
    if (this.temperature === 0) {
      color = 'lightblue'; // Si la temperatura es 0, mostrar un poco de rojo
    } else if (this.temperature === 100) {
      color = 'red'; // Si la temperatura es 100, mostrar todo en rojo
    } else if (this.temperature >= 1 && this.temperature <= 10) {
      color = 'lightblue'; // Si la temperatura está entre 1 y 10 grados, mostrar celeste claro
    } else if (this.temperature < 50) {
      color = `rgb(${255 - (this.temperature * 2.55)}, 255, 0)`; // Color verde a amarillo
    } else {
      color = `rgb(255, ${255 - ((this.temperature - 50) * 5.1)}, 0)`; // Color amarillo a rojo
    }

    // Aplicar el color y la altura calculados a la barra de mercurio
    mercuryElement.style.backgroundColor = color;
    mercuryElement.style.height = `${mercuryHeight}px`;
  }

  // Método para obtener el color del texto de la escala de temperatura según el valor del termómetro
getTemperatureScaleTextColor() {
  if (this.temperature >= 0 && this.temperature <= 10) {
    return 'cold'; // Si la temperatura está entre 0 y 10 grados, texto en azul
  } else if (this.temperature > 10 && this.temperature <= 25) {
    return 'warm'; // Si la temperatura está entre 11 y 25 grados, texto en verde
  } else {
    return 'hot'; // Para cualquier otra temperatura, texto en naranja
  }
}

}

