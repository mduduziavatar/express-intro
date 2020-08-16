const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsFactoryFunction = require('./settingBill-factory');
const app = express();
const settingsBill = SettingsFactoryFunction();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.settingsBillTotals()
    });
});

app.post("/settings", function(req, res) {

    settingsBill.updateValues({
        smsCost: req.body.smsCost,
        callCost: req.body.callCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    console.log(settingsBill.getSettings());
    // note that data can be sent to the template
    res.redirect("/");

});

app.post("/action", function(req, res) {
    settingsBill.addFunction(req.body.billItemTypeWithSettings)
    res.redirect("/");
});

app.get("/actions", function(req, res) {

});

app.get("/actions/:type", function(req, res) {

});



const PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});