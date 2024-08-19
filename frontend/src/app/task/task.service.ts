import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model';

@Injectable({
	providedIn: 'root',
})
export class TaskService {

	private httpClient = inject(HttpClient);

	addTask(task: Task): Observable<void> {
		return this.httpClient.put<void>('/api/task', task);
	}

	fetchTasks(): Observable<Task[]> {
		return this.httpClient.get<Task[]>('/api/task');
	}

	updateTask(task: Task): Observable<void> {
		return this.httpClient.post<void>('/api/task', task);
	}

	removeTask(task: Task): Observable<void> {
		return this.httpClient.delete<void>('/api/task/' + task.id);
	}

}
