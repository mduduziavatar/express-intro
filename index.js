const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsFactoryFunction = require('./settingBill-factory');
const app = express();
const settingsBill = SettingsFactoryFunction();
const PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render('index', {
        values: settingsBill.getSettings(),
        totals: settingsBill.settingsBillTotals(),
        getAllColors: settingsBill.getColorLive()
    });
});

//gets all user settings posted to server
app.post("/settings", function(req, res) {
    settingsBill.updateValues({
        smsCost: req.body.smsCost,
        callCost: req.body.callCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    // settingsBill.getColorLive({
    //         warningLevel: req.body.warningLevel,
    //         criticalLevel: req.body.criticalLevel
    //     })
    //console.log(settingsBill.getSettings());
    // note that data can be sent to the template
    res.redirect("/");

});

//gets all actions clicked settings posted to server
app.post("/action", function(req, res) {
    settingsBill.addFunction(req.body.billItemTypeWithSettings)
    console.log(settingsBill.getColorLive());

    res.redirect("/");
});

//backend tracker of totals being clicked on the server in table format
app.get("/actions", function(req, res) {
    res.render("actions", { actions: settingsBill.actions() });
});

//backend tracker of sms and call being clicked on the server in table format
app.get("/actions/:actionsType", function(req, res) {
    const actionsType = req.params.actionsType
    res.render("actions", { actions: settingsBill.actionClicked(actionsType) });

});