import {AddTodoComponent} from './add-todo.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TodoService} from '../../services/todo.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from '../../../shared/components/molecules/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from '../../../shared/components/atoms/input/input.component';
import {IconButtonComponent} from '../../../shared/components/atoms/icon-button/icon-button.component';

describe('AddTodoComponent', () => {
    let component: AddTodoComponent;
    let fixture: ComponentFixture<AddTodoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule,
            ],
            declarations: [AddTodoComponent, HeaderComponent, InputComponent, IconButtonComponent],
            providers: [TodoService],
            schemas: []
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(AddTodoComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
