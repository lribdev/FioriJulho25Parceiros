/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "trainning/parceiros/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("trainning.parceiros.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                //interceptar as rotas e aplicar um layout correspondente ao Flexible Column Layout
                this.getRouter().attachRouteMatched(this.aoNavegar, this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                //modelo para layout do app
                let oModeloLayout = new JSONModel();
                oModeloLayout.setProperty("/modo", "OneColumn");
                this.setModel(oModeloLayout, "layout");

            },

            aoNavegar: function(oEvent){

                //resgata o nome da rota
                let sNomeRota = oEvent.getParameters().name;

                //nome do layout
                let sLayout;

                //configuração do nome do layout
                switch(sNomeRota){
                    case "RouteParceiros":
                        sLayout = "OneColumn";
                        break;
                    case "RouteDetalheParceiro":
                        sLayout = "TwoColumnsMidExpanded";
                        break;    
                }

                //acessa o modelo de layout e altera a propriedade modo
                let oModeloLayout = this.getModel("layout");
                oModeloLayout.setProperty("/modo", sLayout);

            }
        });
    }
);