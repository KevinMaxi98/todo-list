import {ProgressBarComponent} from './progress-bar.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TodoService} from '../../../../todo-list/services/todo.service';

describe('ProgressBarComponent', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ProgressBarComponent],
            providers: [TodoService],
            schemas: []
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
