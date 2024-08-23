sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/InvoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  
  ],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator) {
      "use strict"
      return Controller.extend("logaligroup.sapui5.controller.InvoicesList", {

       formatter : InvoicesFormatter,
       onInit: function(){
        var oViewModel = new JSONModel({
            usd: "USD",
            eur: "EUR"
        })
        this.getView().setModel(oViewModel, "currency")
       },
       onFilterInvoice : function (oEvent){
         const aFilter = [];
         const squery = oEvent.getParameter("query")
         if (squery){
          aFilter.push( new Filter ("ProductName", FilterOperator.Contains, squery ))
         }
         const oList = this.getView().byId("_IDGenList1")
         const oBinding = oList.getBinding("items")
         oBinding.filter(aFilter)
       },
       navigationToDetails: function (oEvent){
        const oItem = oEvent.getSource()
        const  oRouter = sap.ui.core.UIComponent.getRouterFor(this)
        oRouter.navTo("Details",{
          invoicePath: window.encodeURIComponent(oItem.getBindingContext("northwind").getPath().substr(1))
        })
       }
  
      })
  
    });
  