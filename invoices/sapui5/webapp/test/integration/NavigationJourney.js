
sap.ui.define([
    "logaligroup/sapui5/localService/mockServer",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"

     /**
     * @param {typeof sap.ui.test.opaQUnit} opaQUnit 
     */
], function (mockServer, opaQUnit){
     QUnit.module("Navigation")
     opaQUnit("Should open the Dialog", function(Given, When, Then){

        mockServer.init()

        Given.iStartMyUIComponent({
            componentConfig: {
                name: "logaligroup.sapui5"
            }
        })
        When.onTheAppPage.iSayHelloDialogButton()

        Then.iSeeTheHelloDialog()

        Then.iTeardownMyApp()
     })
})