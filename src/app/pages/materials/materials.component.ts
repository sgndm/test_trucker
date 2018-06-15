import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

    public company_name : string = '';

  constructor() { }

  ngOnInit() {

      this.company_name = "Chandlers Landfill";
      
  }

}
