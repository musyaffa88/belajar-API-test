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

it('Test Get All Todos', async function () {
	const res = await request.get('/todos')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Get a Single Todo', async function () {
	const res = await request.get('/todos/1')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Get a Random Todo', async function () {
	const res = await request.get('/todos/random')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Get a Todos with Limit and Skip', async function () {
	const res = await request.get('/todos?limit=3&skip=10')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Add a Todo', async function () {
    const payload = {
        todo: 'Use DummyJSON in the project',
        completed: false,
        userId: 5,
    }
	const res =  await request.post('/todos/add').send(payload)
	expect(res.body).to.deep.include(payload)
    expect(res.statusCode).to.equal(200)
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Update a Todo', async function () {
    const payload = {
        completed: false,
    }
	const res =  await request.put('/todos/1').send(payload) 
    expect(res.statusCode).to.equal(200)
    expect(res.body.completed).to.equal(payload.completed)
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test Delete a Todo', async function () {
	const res =  await request.delete('/todos/1')
    expect(res.statusCode).to.equal(200)
	expect(res.body).have.jsonSchema(todosSchema)
})
