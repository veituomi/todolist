import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TaskService {

	fetchTasks(): Observable<Task[]> {
		return of(JSON.parse(localStorage.getItem('tasks') || '[]'));
	}

	saveTasks(tasks: Task[]): Observable<boolean> {
		localStorage.setItem('tasks', JSON.stringify(tasks));
		return of(true);
	}

}
