import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';
import {StateService} from '../../services/state.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-todo-wrapper',
    templateUrl: './todo-wrapper.component.html',
    styleUrls: ['./todo-wrapper.component.scss']
})
export class TodoWrapperComponent implements OnInit {

    listPayments: Todo[] = [];
    public frmTodo: FormGroup;
    public showStatus = 0;
    public searchString = '';
    public showLabels = [
        'Mostrar no completados',
        'Mostrar todos'
    ];

    constructor(
        private readonly todoService: TodoService,
        private readonly state: StateService,
        private readonly fb: FormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
        this.getListTodo();
        this.state.todoList$.subscribe(resp => this.listPayments = resp);
        this.frmTodo = this.fb.group({
            searchTodo: [null, [Validators.required]],
        });
    }

    getListTodo(): void {
        this.todoService.getTodoList().subscribe();
    }

    onChangeStatus(changedTodo: Todo): void {
        const newListPayments = [...this.listPayments];
        newListPayments.forEach(todo => {
            if (todo.id === changedTodo.id) {
                todo.status = Number(!Boolean(todo.status));
            }
        });
        this.listPayments = newListPayments;
    }

    addTodo(): void {
        this.router.navigate(['/todo']);
    }

    onSearchTodo($event: string): void {
        this.searchString = $event;
    }

    getDoneTodos(): number {
        return this.listPayments.filter((todo) => todo.status === 1).length;
    }

    getAllTodosLength(): number {
        return this.listPayments.length;
    }

    changeShowStatus(): void {
        this.showStatus = Number(!Boolean(this.showStatus));
        if (this.showStatus === 1) {
            this.filterIncompleted();
        } else {
            this.state.todoList$.subscribe(resp => this.listPayments = resp);
        }
    }

    filterIncompleted(): void {
        this.listPayments = [...this.listPayments.filter((todo) => todo.status === 0)];
    }

    editTodo(todo: Todo): void {
        this.router.navigate(['/todo', {
            id: todo.id,
            description: todo.description,
            status: todo.status,
            id_author: todo.id_author,
            finish_at: todo.finish_at
        }]);

    }

    removeTodo(idTodo: number): void {
        this.todoService.deleteTodo(idTodo).subscribe((resp) => {
            window.location.reload();
        });
    }
}
