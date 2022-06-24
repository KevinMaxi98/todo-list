import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseTodo} from '../interfaces/response';
import {tap} from 'rxjs/operators';
import {StateService} from './state.service';
import {Todo} from '../interfaces/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private readonly ID_AUTOR = 106604416;
    private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';

    constructor(
        private http: HttpClient,
        private readonly state: StateService
    ) {
    }

    getTodoList(): Observable<ResponseTodo> | undefined {
        return this.http.get<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
            tap(
                resp => {
                    this.state.setTodoList(resp.data);
                }
            )
        );
    }

    postTodo(description: string, date: string): Observable<ResponseTodo> | undefined {
        return this.http.post<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, {
            description,
            status: 0,
            id_author: this.ID_AUTOR,
            finish_at: date
        }).pipe(tap(
            data => {
                console.log(data);
            }
        ));
    }

    updateTodo(todo: Todo): Observable<ResponseTodo> | undefined {
        return this.http.put<ResponseTodo>(`${this.ENPOINT}/${todo.id}`, {
            description: todo.description,
            status: todo.status,
            id_author: this.ID_AUTOR,
            finish_at: todo.finish_at
        }).pipe(tap(
            data => {
                console.log(data);
            }
        ));
    }

    deleteTodo(idTodo: number): Observable<ResponseTodo> | undefined {
        return this.http.delete<ResponseTodo>(`${this.ENPOINT}/${idTodo}`).pipe(tap(
            data => {
                console.log(data);
            }
        ));
    }

}
