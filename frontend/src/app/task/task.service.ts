import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, of, repeat, retry, switchMap } from 'rxjs';
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

	hasChanges(): Observable<boolean> {
		let lastUpdate = 0;
		return of(undefined)
			.pipe(
				switchMap(() => this.httpClient.get<number>('/api/task/changes/' + lastUpdate)),
				repeat({ delay: 1_000 }),
				retry({ delay: 1_000 }),
				filter(update => {
					const hasUpdate = update > lastUpdate;
					if (hasUpdate) {
						lastUpdate = update;
					}
					return hasUpdate;
				}),
				map(() => true),
			);
	}

}
