/**
 * 
 * @param {*} router preloaded require('express').Router()
 * @param {*} db preloaded {nedb DataStore}
 */
function initialize(router, db) {
    router
    .get('/:id?', function (req, res, next) {
        if (req.params.id) {
            //http://localhost:3000/{routename}/{id_value}
            db.find({ _id: req.params.id }, (err, docs) => {
                res.send(docs);
            });
        } else {
            //http://localhost:3000/{routename}/ -> return all
            //http://localhost:3000/{routename}/?title=expression -> return filtered
            db.find(req.query, (err, docs) => {
                res.send(docs);
            });
        }
    })
    .delete('/:id', function (req, res, next) {
        db.remove({ _id: req.params.id }, (err, docs) => {
            res.send('Data removed!');
        });
    })
    .post('/', function (req, res, next) {
        if (req.body._id) {
            db.update({ _id: req.body._id }, req.body, (err, newDoc) => {
                if (err) return res.send(err);
                res.send('Data Updated!');
            });
        } else {
            db.insert(req.body, (err, newDoc) => {
                if (err) return res.send(err);
                res.send(newDoc);
            });

        }
    });

    return router;
};

module.exports = initialize;