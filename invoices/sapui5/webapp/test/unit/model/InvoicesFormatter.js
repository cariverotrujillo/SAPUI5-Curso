sap.ui.define([
  "logaligroup/sapui5/model/InvoicesFormatter",
  "sap/ui/model/resource/ResourceModel"
],
  /**
   * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel 
   */
  function (InvoicesFormatter, ResourceModel) {
    "use strict"
    QUnit.module("Inovices Status", {
      beforeEach: function () {
        this._OResourceModel = new ResourceModel({
          bundleUrl: sap.ui.require.toUrl("logaligroup/sapui5") + "/i18n/i18n.properties"
        })
      },
      afterEach: function () {
        this._OResourceModel.destroy()
      }

    })

    QUnit.test("Should return the Invoice Status", function(assert){
      let oModel = this.stub()
      oModel.withArgs("i18n").returns(this._OResourceModel)

      let oViewStub = {
        getModel : oModel
      }

      let oControllerStub = {
        getView : this.stub().returns(oViewStub)
      }

      let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub)

      assert.strictEqual(fnIsolatedFormatter("A"), "New", "For the Value A the status is correct" )
      assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "For the Value B the status is correct" )
      assert.strictEqual(fnIsolatedFormatter("C"), "Done", "For the Value C the status is correct" )
    })
  });