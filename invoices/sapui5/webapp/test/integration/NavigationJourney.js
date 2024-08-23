
sap.ui.define([
    "logaligroup/sapui5/localService/mockServer",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"

     /**
     * @param {typeof sap.ui.test.opaQunit} opaQunit 
     */
], function (mockServer, opaQunit){
     QUnit.module("Navigation")
     opaQunit("Should open the Dialog", function(Given, When, Then){

        mockServer.init()

        Given.iStartMyUIComponent({
            componentConfig: {
                name: "logaligroup.sapui5"
            }
        })
        When.onTheAppPage.iSayHelloDialogButton()

        Then.onTheAppPage.iSeeTheHelloDialog()

        Then.iTeardownMyApp()
     })
})