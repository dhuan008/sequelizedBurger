// Pull in the Burger model
const db = require("../models");

module.exports = app => {
    // Retrieve the list of all burgers in the database
    app.get('/', (req, res) => {
        db.Burger.findAll({}).then(results => {
            const hbsObject = {
                burgers: results
            };
            console.log(hbsObject);
            res.render('index', hbsObject);
        }).catch(error => {
            console.error(error);
        });
    });

    // Create a new burger entry
    app.post('/burgers', (req, res) => {
        const burger = req.body;
        console.log('Burger: ' + burger);
        db.Burger.create({
            burger_name: burger.burger_name,
            devoured: burger.devoured
        }).then(() => {
            res.redirect('/');
        }).catch(error => {
            console.error(error);
        });
    });

    app.post('/burgers/:id', (req, res) => {
        db.Burger.update({
            devoured: true
        },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(result => {
            if (result.changedRows === 0) {
                // error id must not exist
                return res.status(404).end();
            } else {
                res.redirect('/');
            }
        }).catch(error => {
            console.error(error);
        });
    });

    app.delete('/burgers/:id', (req, res) => {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            if (result.affectedRows === 0) {
                // error id must not exist
                return res.status(404).end();
            } else {
                res.redirect('/');
            }
        }).catch(error => {
            console.error(error);
        });
    });


};
