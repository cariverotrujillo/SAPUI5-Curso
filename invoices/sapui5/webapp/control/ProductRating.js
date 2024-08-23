sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
],
    /**
     * 
     * @param {typeof sap.ui.core.Control} Control 
     * @param {typeof sap.m.RatingIndicator} RatingIndicator 
     * @param {typeof sap.m.Label} Label 
     * @param {typeof sap.m.Button} Button 
     */
    function (Control, RatingIndicator, Label, Button ) {
        "use strict"

        return Control.extend("logaligroup.sapui5.control.ProductRating", {
            metadata: {
                properties: {
                    value: { type: "float", defaultValue: 0 }
                }
            },
            aggreegations: {
                _rating: {
                    type: "sap.m.RatingIndicator",
                    multiple: false,
                    visibility: "hidden"
                },
                _label: {
                    type: "sap.m.Label",
                    multiple: false,
                    visibility: "hidden"
                },
                _button: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                change: {
                    parameters: {
                        value: { type: "int" }
                    }
                }
            },
            init: function () {
                this.setAggregation("_rating", new RatingIndicator({
                    value: this.getValue(),
                    iconSize: "2rem",
                    visualMode: "Half",
                    liveChange: this._onRate.bind(this)
                }))
                this.setAggregation("_label", new Label({
                    text: "{i18n>ProductRatingLabelInitial}",
                }))
                this.setAggregation("_button", new Label({
                    text: "{i18n>ProductRatingButton}",
                    press: this._onSubmit.bind(this)
                }))
            },
            _onRate: function(oEvent){
                const oResourceBoundle = this.getModel("i18n").getResourceBoundle()
                const fValue = oEvent.getParameter("value")

                this.setProperty("value", fValue, true)
                this.getAggregation("_label").setText(oResourceBoundle.getText("ProdcutRatingIndicator", [fValue,oEvent.getSource().getMaxValue()]))
                this.getAggregation("_button").setDesign("Bold")
            },
            _onSubmit: function (oEvent){
                const oResourceBoundle = this.getModel("i18n").getResourceBoundle()
                this.getAggregation("_rating").setEnabled("false")
                this.getAggregation("_label").setText(oResourceBoundle.getText("ProdcutRatingLabelFinal"))
                this.getAggregation("_button").setEnabled("false")
                this.fireEvent("change",{
                    value: this.getValue()
                })
            },
            reset: function(){
                const oResourceBoundle = this.getModel("i18n").getResourceBoundle()
                this.setValue(0)
                this.getAggregation("_rating").setEnabled("true")
                this.getAggregation("_label").setText(oResourceBoundle.getText("ProductRatingLabelInitial"))
                this.getAggregation("_button").setEnabled("true")
                
            },
            setValue: function(fValue){
                this.setProperty("value", fValue, true )
                this.getAggregation("_rating").setValue(fValue)
            },
            renderer: function (oRm, oControl) {


            }
        })
    });