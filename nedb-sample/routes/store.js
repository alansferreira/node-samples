var router = require('express').Router();
var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/store.db', autoload: true });

router
.get('/:id?', fn_prehandle, function (req, res, next) {
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
.delete('/:id', fn_prehandle, function (req, res, next) {
    db.remove({ _id: req.params.id }, (err, docs) => {
        res.send(200);
    });
})
.post('/', fn_prehandle, function (req, res, next) {
    if (req.body._id) {
        db.update({ _id: req.body._id }, req.body, (err, newDoc) => {
            if (err) return res.send(err);
            res.send(newDoc);
        });
    } else {
        db.insert(req.body, (err, newDoc) => {
            if (err) return res.send(err);
            res.send(newDoc);
        });

    }
});

function fn_prehandle(req, res, next){
    return next();
}
module.exports = router;
