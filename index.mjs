import express from "express";
const app = express();
import debug from "debug";
const log = debug('bethany:rest-server');
import { pieRepo } from "./repos/pieRepo.mjs";

const router = express.Router();
app.use(express.json());

router.get('/', (req, res, next) => {
    pieRepo.get(
        data => {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All pies retrieved",
                "data": data
            });
        },
        err => next(err)
    );
});

router.get('/search', (req, res, next) => {
    const searchObject = {
        id: req.query.id,
        name: req.query.name
    }

    pieRepo.search(
        searchObject,
        data => {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All pies retrieved",
                "data": data
            });
        },
        err => next(err)
    );
});

router.get('/:id', (req, res, next) => {
    pieRepo.getById(
        req.params.id,
        data => {
            if (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Single pie retrieved",
                    "data": data
                });
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `The pie '${req.params.id}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `The pie '${req.params.id}' could not be found.`
                    }
                });
            }
        },
        err => next(err)
    );
});

router.post('/', (req, res, next) => {
    pieRepo.insert(
        req.body,
        data => {
            res.status(201).json({
                "status": 201,
                "statusText": "Created",
                "message": "New pie added.",
                "data": data
            });
        },
        err => next(err)
    );
});

router.put('/:id', (req, res, next) => {
    pieRepo.getById(
        req.params.id,
        data => {
            if (data) {
                pieRepo.update(
                    req.body,
                    req.params.id,
                    data => {
                        res.status(200).json({
                            "status": 200,
                            "statusText": "OK",
                            "message": `Pie '${req.params.id}' updated`,
                            "data": data
                        });
                    },
                    err => next(err)
                );
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `The pie '${req.params.id}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `The pie '${req.params.id}' could not be found.`
                    }
                });
            }
        },
        err => next(err)
    );
});

router.patch('/:id', (req, res, next) => {
    pieRepo.getById(
        req.params.id,
        data => {
            if (data) {
                pieRepo.update(
                    req.body,
                    req.params.id,
                    data => {
                        res.status(200).json({
                            "status": 200,
                            "statusText": "OK",
                            "message": `Pie '${req.params.id}' patched`,
                            "data": data
                        });
                    },
                    err => next(err)
                );
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `The pie '${req.params.id}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `The pie '${req.params.id}' could not be found.`
                    }
                });
            }
        },
        err => next(err)
    );
});

router.delete('/:id', (req, res, next) => {
    pieRepo.getById(
        req.params.id,
        data => {
            if (data) {
                pieRepo.delete(
                    req.params.id,
                    data => {
                        res.status(200).json({
                            "status": 200,
                            "statusText": "OK",
                            "message": `Pie '${req.params.id}' deleted`,
                            "data": `Pie '${req.params.id}' deleted`
                        });
                    },
                    err => next(err)
                );
            } else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `The pie '${req.params.id}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `The pie '${req.params.id}' could not be found.`
                    }
                });
            }
        },
        err => next(err)
    );
});

app.use('/api/', router);

app.listen(5000, () => {
    log(`Node server is running on http://localhost:5000..`);
})