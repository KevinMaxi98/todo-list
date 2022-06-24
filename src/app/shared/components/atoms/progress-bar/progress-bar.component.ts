import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent {
    @Input() totalTodos: number;
    @Input() doneTodos: number;

    getProgressValue(): number {
        console.log(this.doneTodos / this.totalTodos);
        return this.doneTodos / this.totalTodos * 100;
    }
}
