module.exports = function SettingsFactoryFunction() {

        // variables
        var callTotalSettings = 0.00;
        var smsTotalSettings = 0.00;
        var totalSettings = 0.00;

        var callCostValue = 0.00;
        var smsCostValue = 0.00;
        var warningLevelValue = 0.00;
        var criticalLevelValue = 0.00;



        // functions to return
        function updateValues(inputFactory) {


            if (checkInput(inputFactory)) {
                callCostValue = Number(inputFactory.callCost);
                smsCostValue = Number(inputFactory.smsCost);
                warningLevelValue = Number(inputFactory.warningLevel);
                criticalLevelValue = Number(inputFactory.criticalLevel);
                return true;
            }
            return false;
        }

        function getSettings() {
            return {
                callCostValue,
                smsCostValue,
                warningLevelValue,
                criticalLevelValue
            }
        }

        // functions to use
        function checkInput(object) {
            for (const i in object) {
                var currentValue = parseFloat(object[i])
                if (isNaN(currentValue)) {
                    return false;
                }
            }
            return true;
        }



        function addFunction(item) {
            if (totalSettings < criticalLevelValue) {
                switch (item) {
                    case "call":
                        totalSettings += callCostValue;
                        callTotalSettings += callCostValue;
                        break;
                    case "sms":
                        totalSettings += smsCostValue;
                        smsTotalSettings += smsCostValue;
                        break;
                    default:
                        return false
                };
                return true
            }
            return false

        }

        function getColorLive() {
            if (totalSettings === 0) {
                return "";
            }
            if (totalSettings >= warningLevelValue && totalSettings < criticalLevelValue) {
                return "warning";
            } else if (totalSettings >= criticalLevelValue) {
                return "danger";
            } else {
                return "";
            }
        }



        function settingsBillTotals() {
            return {
                totalSettings,
                callTotalSettings,
                smsTotalSettings
            };
        }


        // closure
        return {
            updateValues,
            settingsBillTotals,
            addFunction,
            getColorLive,
            getSettings
        }

    } // factory ends here