import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as Papa from 'papaparse'
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-csv-read',
  templateUrl: './csv-read.component.html',
  styleUrl: './csv-read.component.css'
})
export class CsvReadComponent implements OnInit{

  @ViewChild('dropZone') dropZoneElement!: ElementRef
  @ViewChild('fileUploadZone') fileUploadZoneElement!: ElementRef
  highestCovid: any = null;
  lowestCovid: any = null;
  highestAffected: any = null;
  chart: any = [];


  ngOnInit(){
  }

  onDrop(event: DragEvent){
    event.preventDefault()

    const file:any = event.dataTransfer?.files[0];

    if(file){
      if(this.isTypeCSV(file)){
        this.fileName = file.name;
        this.parseCSVFile(file)
      } else{
        alert('Tipo de archivo no permitido') // implementar con sweet alert 2
      }
    }
  }

  parseCSVFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const csvString = event.target.result as string;
        Papa.parse(csvString, {
          complete: (results) => {
            this.calculateCovidData(results.data)
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error.message);
          },
        });
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(file);
  }

  onDragOver(event: DragEvent){
    event.preventDefault()
    this.dropZoneElement.nativeElement.style.border = '2px solid #9DBCCD';
  }

  onDragLeave(event: DragEvent){
    event.preventDefault()
    this.dropZoneElement.nativeElement.style.border = '2px dashed #9DBCCD';
  }

  isTypeCSV(file: File){
    return file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
  }

  calculateCovidData(parsedCSV: any[]){
    function compareDeaths(a: any, b: any) {
      return a.deaths - b.deaths;
    }

    function compareDefer(a: any, b: any){
      return a.deathDeferPercentage - b.deathDeferPercentage
    }

    const stateArray: any[] = this.returnFilledStateDataArray(parsedCSV)

    const deathDeferSortedArray = [...stateArray];
    stateArray.sort(compareDeaths)
    deathDeferSortedArray.sort(compareDefer)
    // console.log(stateArray)
    console.log(deathDeferSortedArray)
    this.lowestCovid = stateArray[0]
    this.highestCovid = stateArray[stateArray.length -1]
    this.highestAffected = deathDeferSortedArray[deathDeferSortedArray.length -1]

    let totalPopulation: number = 0;
    let totalDeaths: number = 0;

    deathDeferSortedArray.forEach((state: any) => {
      totalDeaths += parseInt(state.deaths);
      totalPopulation += parseInt(state.population);
    })

    totalPopulation += totalDeaths;
    this.renderGraph([totalDeaths, totalPopulation])
  }

  returnFilledStateDataArray(parsedCSV: any[]): any[]{
    function roundTwoDecimals(number: number){
      return parseFloat((Math.round(number * 100) / 100).toFixed(2));
    }

    let statesObject: Object = {};
    const stateArray: any[] = [];

    parsedCSV.splice(0,1)
    parsedCSV.forEach((county: any, index: number) => {
      //@ts-ignore
      statesObject[county[6]] = {
        population: 0,
        deaths: 0
      }
    })
    parsedCSV.forEach((county: any, index: number) => {
      //@ts-ignore
      statesObject[county[6]].population += parseInt(county[11])
      county.forEach((element: any, index: number) => {
        if(index > 11){
          //@ts-ignore
          statesObject[county[6]].deaths += parseInt(element)
        }
      });
    })
    for(const state in statesObject){
      //@ts-ignore
      let stateToPush: any = statesObject[state];
      const statePopulation: any = stateToPush.population;
      const stateDeaths: any = stateToPush.deaths;
      let stateDeathDeferPercentage;
      if(statePopulation == 0){
        stateDeathDeferPercentage = 0;
      } else{
        stateDeathDeferPercentage = roundTwoDecimals((stateDeaths / (statePopulation + stateDeaths)) * 100)
      }
      stateArray.push(
        {
          name: state,
          //@ts-ignore
          population: statePopulation,
          //@ts-ignore
          deaths: stateDeaths,
          //@ts-ignore
          deathDeferPercentage: stateDeathDeferPercentage
        }
      )
    }

    return stateArray
  }


  renderGraph(dataset: number[]){
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Deaths', 'Population'],
        datasets: [{
          label: '% de muertes totales en Estados Unidos',
          data: dataset,
          backgroundColor: ['rgb(103,103,103)', 'rgb(73,111,138)'],
          hoverOffset: 4,
        }]
      },
      options: {
        // Additional options for the pie chart
      }
    });""


    // console.log(this.canvas)
    // this.canvas.nativeElement.getContext('2d')
    // console.log(dataset)

    // const data = {
    //   labels: ['Muertes','Poblacion'],
    //   datasets: [{
    //     data: [30, 40], // Example data values
    //     backgroundColor: ['red', 'green'], // Example background colors
    //     hoverOffset: 4, // Offset when hovering over slices
    //     // You can add more options specific to the pie dataset here
    //   }]
    // };
    // //@ts-ignore
    // this.chart = new Chart(this.canvas, {
    //   type: 'pie',
    //   data: data,
    //   // options: {
    //   //   scales: {
    //   //     y: {
    //   //       beginAtZero: true,
    //   //     },
    //   //   },
    //   // },
    // });
  }

  fileName: string = "";

  handleUpload(){
    const file = this.fileUploadZoneElement.nativeElement.files[0];
    this.fileName = file.name;

    if(file){
      if(this.isTypeCSV(file)){
        this.parseCSVFile(file)
      } else{
        alert('Tipo de archivo no permitido') // implementar con sweet alert 2
      }
    }
  }
}


