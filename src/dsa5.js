const admin = require('firebase-admin');
const { resolve } = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

async function setup(basePath) {
    const db = admin.firestore();
    const game = db.collection('games').doc('dsa5');

    game.set(load(basePath, 'metadata.json'));

    await uploadList(game, basePath, 'races');
    await uploadList(game, basePath, 'levels');
}

async function uploadList(db, basePath, path) {
    const entities = await list(basePath, path);
    await Promise.all(entities.map(entity => db.collection(path).doc(entity.id).set(entity)));
}

async function list(basePath, loadPath) {
    const path = resolve(basePath, loadPath);
    const files = await readdir(path);
    return files.map(filename => require(resolve(path, filename)));
}

function load(basePath, loadPath) {
    const path = resolve(basePath, loadPath);
    return require(path);
}

module.exports = {
    setup
};
