var sensors_controller = require('../handlers/listOfSensorsIDs');


exports.index = function(req, res, next) {

    const data = await sensors_controller.listSensors();
    res.render('index', { title: 'API HOW TO', data: data});
}