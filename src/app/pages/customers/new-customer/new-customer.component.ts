import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

    public company_name : string = '';

  constructor() { }

  ngOnInit() {
      this.company_name = "Chandlers Landfill";
  }

}
