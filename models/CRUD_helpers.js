var APIResponse = require('./APIResponse');

async function create(object, res, next) {
    try {
        const o = await object.save();
        const response = new APIResponse(true, 201, null, o);
        res.status(201).json(response);
    }catch (err) {
        next(err);
    }
}

async function del(Model, id, res, next) {
    try {
        await Model.findByIdAndRemove(id);
        const response = new APIResponse(true, 200, null, null);
        res.status(200).json(response);
    }catch (err) {
        next(err);
    }
}

async function read(Model, id, res, next) {
    try {
        const o = await Model.findById(id);
        const response = new APIResponse(true, 200, null, o);
        res.status(200).json(response);
    }catch (err) {
        next(err);
    }
}

async function readList(Model, query, res, next) {
    try {
        const o = await Model.find(query);
        const response = new APIResponse(true, 200, null, o);
        res.status(200).json(response);
    }catch (err) {
        next(err);
    }
}

exports.create = create;
exports.read = read;
exports.delete = del;
exports.readList = readList;