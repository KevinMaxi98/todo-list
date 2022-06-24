import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder = '';
  @Input() frmTodo: FormGroup;
  @Output() onKeyUpEvent = new EventEmitter<any>();
  @Output() onInputEvent = new EventEmitter<any>();

  @ViewChild('input') inputElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event): void {
    this.onKeyUpEvent.emit(event);
  }

  onInput(event): void {
    this.onInputEvent.emit(this.inputElement.nativeElement.value);
  }
}
