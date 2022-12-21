import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front_inteligentes2';

  //array varibales to store csv data
  lines: any[] = []; //for headings
  linesR: any[] = []; // for rows
  dataset: File | null = null;

  //File upload function
  changeListener(event: Event) {
    // console.log(event);
    if (event) {
      const target = event.target as HTMLInputElement;
      let file: File | undefined = target.files?.[0];
      if (file != null) {
        this.dataset = file;
        //File reader method
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          allTextLines = csv.split(/\r|\n|\r/);

          //Table Headings
          let headers = allTextLines[0].split(',');
          let data = headers;
          let tarr: any[] = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          //Pusd headings to array variable
          this.lines.push(tarr);

          // Table Rows
          let tarrR = [];

          let arrl = allTextLines.length;
          let rows = [];
          for (let i = 1; i < arrl; i++) {
            rows.push(allTextLines[i].split(','));
          }

          for (let j = 0; j < arrl; j++) {
            tarrR.push(rows[j]);
          }
          //Push rows to array variable
          this.linesR.push(tarrR);
        };
      }
    }
  }

  runAlgorithm() {
    if (this.dataset !== null) {
      if (this.algorithm !== 'kmeans' && this.captura.columnName === '') {
        alert(
          'Para usar este algoritmo debes seleccionar qué columna será la clase'
        );
      } else {
        let formData = new FormData();
        formData.append('file', this.dataset);
        formData.append('algorithm', this.algorithm);
        formData.append('class_col', this.captura.columnName);

        fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        })
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              console.log(res);
              return res.json();
            } else {
              return new Error();
            }
          })
          .then((data) => console.log(data))
          .catch((err) => alert(err));
      }
    } else {
      alert('No has cargado ningún dataset todavía');
    }
  }

  captura: { columnName: string; columnIndex: number } = {
    columnName: '',
    columnIndex: 0,
  };
  obtenerItem(item: string, index: number) {
    this.captura = { columnName: item, columnIndex: index };
    console.log('👌', this.captura);
    return this.captura;
  }

  algorithm = 'kmeans';
  handleAlgorithmSelect(event: any) {
    if (event) {
      const target = event.target as HTMLSelectElement;
      this.algorithm = target.value;
      console.log('❤️', this.algorithm);
    }
  }
}
