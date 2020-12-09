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
    return db('schemes').where({ id }).first()
    // On an invalid id, resolves to null, perhaps by doing
    // if (!schemaObject) return Promise.resolve(null)
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
    .where({scheme_id: id})
    .orderBy('steps.steps_number')
}

function add(scheme) {
    return db('scheme').insert(scheme)
}

function update(changes, id) {
    return db('scheme').where({ id }).update(changes)
    .then(() => {
        return findById(id)
    })
}

function remove(id) {
    return db('db').where({ id }).del()
    // resolves to null on an invalid id
}