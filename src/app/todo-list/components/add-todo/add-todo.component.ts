import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    public frmTodo: FormGroup;
    public todo: Todo;
    public editMode = false;

    constructor(
        private readonly fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.frmTodo = this.fb.group({
            descriptionTodo: [null, [Validators.maxLength(50), Validators.required]],
            finishAt: [null, [Validators.required]]
        });
        console.log(this.route.snapshot.paramMap);
        if (this.route.snapshot.paramMap.get('description') !== null) {
            this.editMode = true;
            this.todo = {
                id:  Number(this.route.snapshot.paramMap.get('id')),
                description: this.route.snapshot.paramMap.get('description'),
                status: Number(this.route.snapshot.paramMap.get('status')),
                id_author: Number(this.route.snapshot.paramMap.get('id_author')),
                finish_at: this.route.snapshot.paramMap.get('finish_at'),
            };
            this.frmTodo.controls.descriptionTodo.setValue(this.route.snapshot.paramMap.get('description'));
            this.frmTodo.controls.finishAt.setValue(this.route.snapshot.paramMap.get('finish_at').substr(0, 10));
            console.log(this.frmTodo);
        }
    }

    onClickAdd(): void {
        if (!this.editMode) {
            this.todoService.postTodo(this.frmTodo.value.descriptionTodo, this.frmTodo.value.finishAt)
                .subscribe((resp) => this.router.navigate(['/']));
        } else {
            this.todo.description = this.frmTodo.value.descriptionTodo;
            this.todo.finish_at = this.frmTodo.value.finishAt;
            this.todoService.updateTodo(this.todo).subscribe((resp) => this.router.navigate(['/']));
        }
    }


    onClickBack(): void {
        this.router.navigate(['/']);

    }
}
