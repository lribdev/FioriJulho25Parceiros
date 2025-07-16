sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("trainning.parceiros.controller.NovoParceiro", {
        onInit: function() {
            //resgata o roteador no pai do controller (Component.js)
            let oRoteador = this.getOwnerComponent().getRouter();

            //interceptar a rota de novo parceiro e carregar o fragmento
            oRoteador.getRoute("RouteNovoParceiro").attachPatternMatched(this.rotaNovoParceiro, this);

        },

        rotaNovoParceiro: function(oEvent){
            //resgata o modelo de modo
            let oModeloModo = this.getOwnerComponent().getModel("modo");

            //altera a propriedade editável para true para habilitar todos os inputs do formulário
            oModeloModo.setProperty("/editavel", true);
        }

      });
    }
  );
  