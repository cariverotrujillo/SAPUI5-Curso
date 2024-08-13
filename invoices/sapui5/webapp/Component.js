sap.ui.define([
  "sap/ui/core/UIComponent",
  "logaligroup/sapui5/model/models",
  "sap/ui/model/resource/ResourceModel",
  "./controller/HelloDialog"
],
  /**
 * 
 * @param {typeof sap.ui.core.UIComponent} UIComponent 
 */
  function (UIComponent, models, ResourceModel, helloDialog) {
    "use strict"
    return UIComponent.extend("logaligroup.sapui5.Component", {
      metadata: {
        manifest: "json"
        //    "rootView":{
        //        "viewName": "logaligroup.sapui5.view.App",
        //        "type": "XML",
        //        "async": true,
        //        "id": "app"

        //    }
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments)
        // set date view
        this.setModel(models.createRecipient());
        // set i18n model on view
        const i18nModel = new ResourceModel({
          bundleName: "logaligroup.sapui5.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");

        this._HelloDialog = new helloDialog(this.getRootControl())
      },
      exit: function(){
        this._HelloDialog.destroy()
        delete this._HelloDialog
      },
      openHelloDialog: function(){
        this._HelloDialog.open()
      }
    })

  });