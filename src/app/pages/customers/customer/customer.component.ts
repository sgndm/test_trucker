import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('#tab_1').show();
  }

  show_tab(tab_id, count) {
      // alert(tab_id);
      $('#' + tab_id).show();
      for(let x = 1; x <= count; x++) {
          if(x == tab_id) {
              $('#tab_' + x).show();
          } else {
              $('#tab_' + x).hide();
          }

      }
  }

}
