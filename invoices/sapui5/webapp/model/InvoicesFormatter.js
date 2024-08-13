sap.ui.define([],

    function () {
        "use strict"
        return {
            invoiceStatus: function (sStatus) {
                const resourceBundle = this.getView().getModel("i18n").getResourceBundle()
                switch (sStatus) {
                    case 'A': return resourceBundle.getText("InvoicesStatusA");
                    case 'B': return resourceBundle.getText("InvoicesStatusB");
                    case 'C': return resourceBundle.getText("InvoicesStatusC");
                    default: return sStatus;
                }
            }
        }

    });
