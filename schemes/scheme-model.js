// scheme-model
const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    const schemaObject = db('schemes').where({ id }).first()
    if (!schemaObject) {
        return null
    } else {
        return schemaObject
    }
}

function findSteps(id) {
    // SELECT
    //     steps.id,
    //     schemes.scheme_name,
    //     steps.step_number,
    //     steps.instructions
    // FROM schemes
    // JOIN steps 
    //     ON schemes.id = steps.scheme_id
    // WHERE scheme_id = 2
    // ORDER BY steps.step_number;
    return db('steps')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .where({scheme_id: id})
    .orderBy('steps.step_number')
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then((id) => {
        return db('schemes').where({ id }).first()
    })
}

function update(changes, id) {
    return db('schemes').where({ id }).update(changes)
    .then(() => {
        return findById(id)
    })
}

async function remove(id) {
    const removedObj = await findById(id)
    const remove = db('schemes').where({ id }).del()
    .then(() => {
        return findById(id)
    })
    if (!remove) {
        return null
    } else {
        return removedObj
    }
    // const deleted = db('schemes').where({ id }).first()
    // db('schemes').where({ id }).del();
    // return deleted;
    // return db('schemes').where({ id }).del()
    // resolves to null on an invalid id
}