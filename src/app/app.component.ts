import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_inteligentes2';

  //array varibales to store csv data
  lines : any[]=[];//for headings
  linesR : any[]=[]; // for rows

  //File upload function
  changeListener(event:Event){
    console.log(event);
    if(event) {
      const target = event.target as HTMLInputElement;
       let file : File|undefined = target.files?.[0];
       if(file!=null){
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
          let tarr: any[]=[];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          //Pusd headings to array variable
          this.lines.push(tarr);


          // Table Rows
          let tarrR = [];

          let arrl = allTextLines.length;
          let rows = [];
          for(let i = 1; i < arrl; i++){
          rows.push(allTextLines[i].split(','));

          }

          for (let j = 0; j < arrl; j++) {

              tarrR.push(rows[j]);

          }
         //Push rows to array variable
          this.linesR.push(tarrR);
       }


      }
    }

  }
  captura : any[]=[];
  obtenerItem(item:any)
  {
    this.captura = item;
    return this.captura;
  }

}
