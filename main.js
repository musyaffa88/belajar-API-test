const request = require('supertest')('https://dummyjson.com')
const chai = require('chai')
const chaiJsonSchema = require('chai-json-schema')

chai.use(chaiJsonSchema)
const expect = chai.expect
const todosSchema = {
	type: 'object',
	properties: {
		todos: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					todo: { type: 'string' },
					completed: { type: 'boolean' },
					userId: { type: 'number' },
				},
				required: ['id', 'todo', 'completed' ,'userId']
			}
		}
	}
}

const todoSchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		todo: { type: 'string' },
		userId: { type: 'number' },
		completed: { type: 'boolean' },
	},
	required: ['id', 'todo', 'userId']
}
it('test json schema array', async function () {
	const res = await request.get('/todos')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('test json schema object', async function () {
	const res = await request.get('/todos/1')
	expect(res.body).have.jsonSchema(todoSchema)
})

