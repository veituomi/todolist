import express from 'express';
import { TaskRepository } from './task-repository';

const app = express();
const port = 3000;

app.use(express.json());

const tasks = new TaskRepository();

app.put('/task', (req, res) => {
	res.send(tasks.create(req.body));
});

app.get('/task', (req, res) => {
	res.send(tasks.getAll());
});

app.post('/task', (req, res) => {
	res.send(tasks.update(req.body));
});

app.delete('/task/:id', (req, res) => {
	res.send(tasks.remove(Number(req.params.id)));
});

app.listen(port, () => {
	console.log(`Palvelin kuuntelee osoitteessa http://localhost:${port}`);
});
