import { Component, ViewChild, ElementRef } from '@angular/core';
import * as Papa from 'papaparse'

@Component({
  selector: 'app-csv-read',
  templateUrl: './csv-read.component.html',
  styleUrl: './csv-read.component.css'
})
export class CsvReadComponent {

  @ViewChild('dropZone') dropZoneElement!: ElementRef
  highestCovid: any = null;
  lowestCovid: any = null;
  highestAffected: any = null;

  onDrop(event: DragEvent){
    event.preventDefault()

    const file:any = event.dataTransfer?.files[0];

    if(file){
      if(this.isTypeCSV(file)){
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
            //console.log('Parsed CSV data:', results.data);
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
        stateDeathDeferPercentage = roundTwoDecimals((stateDeaths / statePopulation) * 100)
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

    const deathDeferSortedArray = [...stateArray];
    stateArray.sort(compareDeaths)
    deathDeferSortedArray.sort(compareDefer)
    console.log(stateArray)
    console.log(deathDeferSortedArray)
    this.highestCovid = stateArray[stateArray.length -1]
    this.lowestCovid = stateArray[0];
    this.highestAffected = deathDeferSortedArray[deathDeferSortedArray.length -1]

    // console.log(parsedCSV[1][6]) // stateName
    // console.log(parsedCSV[1][11]) // population
    // let helper = 0;
    // parsedCSV[1].forEach((element: any, index: number) => {
    //   if(index > 11){
    //     helper += parseInt(element);
    //   }
    // });
    // console.log(helper)
    // let lolAss = 0;
    // parsedCSV.forEach((element: any, index: number) => {
    //   if
    //   lolAss += index
    // })
    // console.log(parsedCSV[1])
  }
}
