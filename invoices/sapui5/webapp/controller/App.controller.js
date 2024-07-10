sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"

],
  /**
   * 
   * @param {typeof sap.ui.core.mvc.Controller} Controller 
   * @param {typeof sap.m.MessageToasmt} MessageToast 
   * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel 
   */
  function (Controller, MessageToast, models, ResourceModel) {
    "use strict"
    return Controller.extend("logaligroup.sapui5.controller.App", {
      onInit: function () {

      },
      OnShow: function () {
        var OBundle =   this.getView().getModel("i18n").getResourceBundle();
        var sReceipt = this.getView().getModel().getProperty("/recipient/name");
        var sMsg = OBundle.getText("HelloText", [sReceipt])
        MessageToast.show(sMsg)
      }
    })

  });
