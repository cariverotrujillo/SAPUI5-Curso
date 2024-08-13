sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"

],
  /**
   * 
   * @param {typeof sap.ui.core.mvc.Controller} Controller 
   * @param {typeof sap.m.MessageToasmt} MessageToast   
   */
  function (Controller, MessageToast) {
    "use strict"
    return Controller.extend("logaligroup.sapui5.controller.HelloPanel", {
      onInit: function () {

      },
      OnShow: function () {
        var OBundle = this.getView().getModel("i18n").getResourceBundle();
        var sReceipt = this.getView().getModel().getProperty("/recipient/name");
        var sMsg = OBundle.getText("HelloText", [sReceipt])
        MessageToast.show(sMsg)
      },
      OnOpenDialog: function () {
        this.getOwnerComponent().openHelloDialog();
      }
    })

  });
