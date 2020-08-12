import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plan-list-input',
  templateUrl: './plan-list-input.component.html',
  styleUrls: ['./plan-list-input.component.css']
})
export class PlanListInputComponent implements OnInit {

  @Input() travel:any
  // @Input() event:any
  // @Output() buttonClick=new EventEmitter()
  // handleClickMe()
  // {
  //   this.buttonClick.emit(this.travel.name);
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
