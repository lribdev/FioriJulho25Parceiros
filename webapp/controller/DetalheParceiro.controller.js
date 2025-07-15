sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"  
    ],
    function(BaseController, Fragment) {
      "use strict";
  
      return BaseController.extend("trainning.parceiros.controller.DetalheParceiro", {
        onInit: function() {

            //resgata o roteador no pai do controller (Component.js)
            let oRoteador = this.getOwnerComponent().getRouter();

            //interceptar a rota de detalhe e resgatar o ID do parceiro
            oRoteador.getRoute("RouteDetalheParceiro").attachPatternMatched(this.rotaDetalheParceiro, this);


        },


        rotaDetalheParceiro: function(oEvent){

            //regata o modelo OData
            let oModel = this.getOwnerComponent().getModel();

            //resgata o ID do parceiro da rota
            let sIdParceiro = oEvent.getParameters().arguments.idParceiro;

            //monta o caminho pro Read
            let sCaminho = oModel.createKey("/I_BusinessPartner", {
                BusinessPartner: sIdParceiro
            });


            //acessa a view
            let oView = this.getView();

            //associa os dados do parceiro selecionado diretamente na view
            oView.bindElement(sCaminho);

            //carrega o fragmento de detalhe
            Fragment.load({
               name: "trainning.parceiros.view.fragment.formParceiro",
               controller: this 
            }).then( oFragment => {

                //inclui como dependente da view (inclui o fragmento no ciclo de vida da view)
                this.getView().addDependent(oFragment);


                //exibe o fragmento via método addContent da página
                this.getView().byId("detalheParceiro").addContent(oFragment);

            });


        }
      });
    }
  );
  