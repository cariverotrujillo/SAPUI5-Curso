sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"

     /**
     * 
     * @param {typeof sap.ui.core.util.MockServer} MockServer 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.base.util.UriParameters} UriParameters 
     * @param {typeof sap.base.Log} Log 
     */
], function ( MockServer, JSONModel, UriParameters, Log ){
    var oMockServer,
        _sAppPath = "logaligroup/sapui5/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata"

    var oMockServerInterface = {

           /**
     * @protected
     * @param {object} oOptionsParameters 
     * @returns{Promise}
     */
      init: function (oOptionsParameters) {
         var oOptions = oOptionsParameters || {}
         return  new Promise (function(fnResolve, fnReject){
        var sManifestUrl =  sap.ui.require.toUrl( _sAppPath + "manifest.json"),
            oManifestModel = new JSONModel(sManifestUrl)


            oManifestModel.attachRequestCompleted(function(){
                var oUriParameters = new UriParameters(window.location.href)
                var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath)
                var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService")
                var sMetaDataUrl = sap.ui.require.toUrl( _sAppPath + oMainDataSource.settings.localUri )

                var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                 if(!oMockServer){
                    oMockServer = new MockServer({
                        rootUri : sMockServerUrl
                    })
                 } else{
                    oMockServer.stop()
                 }

                 MockServer.config({
                    autoRespond : true,
                    autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500 )
                 })

                 oMockServer.simulate(sMetaDataUrl, {
                    sMockdataBaseUrl : sJsonFilesUrl,
                    bGenerateMissingMockData : true
                 })

                 var aRequests = oMockServer.getRequests()

                 var fnResponse = function (iErrCode, sMessage, aRequests){
                    aRequests.response = function(oXhr){
                        oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"},sMessage)
                    }
                 }

                 if (oOptions.metadataError || oUriParameters.get("metadataError")){
                    aRequests.forEach(function(aEntry){
                        if (aEntry.path.toString().indexof("$metadata") > -1){
                          fnResponse(500, "metadata Error", aEntry)
                        }
                    })
                 }

                 var sErrorParam = oOptions.errorType || oUriParameters.get("errorType")
                 var iErrorCode = sErrorParam === "badRequest" ? 400 : 500

                 if(sErrorParam){
                    aRequests(iErrorCode, sErrorParam, aEntry)
                 }

                 oMockServer.setRequests(aRequests)
                 oMockServer.start()

                 Log.info("Running the server with Mock data")
                 fnResolve()
                 oManifestModel.attachRequestFailed(function(){
                    var sError = "Failed to load"
                    Log.error(sError)
                    fnReject(new Error(sError))
                })
            })
         })

      }
    }

    return oMockServerInterface;
})