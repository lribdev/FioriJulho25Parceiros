sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"  
    ],
    function(BaseController, Fragment) {
      "use strict";
  
      return BaseController.extend("trainning.parceiros.controller.DetalheParceiro", {
        onInit: function() {

            //declarando a variável que guarda o fragmento instanciado (para evitar de instanciar várias vezes)
            this._oFragment;

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
            let sCaminho = oModel.createKey("/Parceiros", {
                PartnerId: sIdParceiro
            });

            //acessa a view
            let oView = this.getView();

            //associa os dados do parceiro selecionado diretamente na view
            oView.bindElement(sCaminho);

            //resgata o modelo de modo
            let oModeloModo = this.getOwnerComponent().getModel("modo");

            //altera a propriedade editável para false para habilitar todos os inputs do formulário
            oModeloModo.setProperty("/editavel", false);

            //carrega o fragmento de detalhe
            if(!this._oFragment){
                Fragment.load({
                    name: "trainning.parceiros.view.fragment.formParceiro",
                    controller: this 
                 }).then( oFragment => {
                    
                    //guarda o fragmento instanciado na variável
                    this._oFragment = oFragment; 

                    //inclui como dependente da view (inclui o fragmento no ciclo de vida da view)
                     this.getView().addDependent(oFragment);
                     //exibe o fragmento via método addContent da página
                     this.getView().byId("detalheParceiro").addContent(this._oFragment);
                 });     
            }else{ //senão, basta incluir o fragmento já instanciado
                this.getView().byId("detalheParceiro").addContent(this._oFragment);
            }
        },

        aoEditar: function(oEvent){
            //resgata o modelo de modo
            let oModeloModo = this.getOwnerComponent().getModel("modo");

            //altera a propriedade editável para true para habilitar todos os inputs do formulário
            oModeloModo.setProperty("/editavel", true);

            //esconde o botão editar
            this.getView().byId("btnEditar").setVisible(false);

            //exibe os botões salvar e cancelar
            this.getView().byId("btnSalvar").setVisible(true);
            this.getView().byId("btnCancelar").setVisible(true);     

        }


    });
    }
  );
  