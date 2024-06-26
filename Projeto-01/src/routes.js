import { randomUUID } from 'node:crypto';
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            }: null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            const task ={
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            
            try {
                database.delete('tasks', id)
            }
            catch(erro) {
                console.log(erro);
                return res.writeHead(404).end();
            }

            return res.writeHead(204).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const { title, description } = req.body

            const task = { updated_at: new Date() }
            if(title)task.title = title
            if(description)task.description = description

            try {
                database.update('tasks', id, task)
            }
            catch(error) {
                console.log(error)
                return res.writeHead(404).end()
            }
            
            return res.writeHead(200).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            const task = {
                completed_at: true,
                updated_at: new Date()
            }

            try {
                database.update('tasks', id, task)
            }
            catch(error) {
                console.log(error)
                return res.writeHead(404).end()
            }
            
            return res.writeHead(200).end()
        }
    },
]