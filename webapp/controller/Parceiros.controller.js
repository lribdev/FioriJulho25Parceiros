sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("trainning.parceiros.controller.Parceiros", {
        onInit: function () {

        },

        aoPesquisarParceiro: function(oEvent){
            //resgata a string de pesquisa
            let sPesquisa = oEvent.getParameter('newValue');

            //configura o objeto de filtro com o valor da pesquisa
            let oFiltro1 = new Filter({
                path: "BusinessPartnerName",
                operator: FilterOperator.Contains,
                value1: sPesquisa
            });
            let oFiltro2 = new Filter({
                path: "BusinessPartner",
                operator: FilterOperator.Contains,
                value1: sPesquisa
            });

            let oFiltroComposto = new Filter({
                filters: [oFiltro1, oFiltro2],
                and: false
            });
            // //declara o array de filtros
            // let aFilters = [];
            // aFilters.push(oFiltro);

            //acessa a lista
            let oLista = this.getView().byId("listaParceiros");
            //acessa o binding da lista. "Items" é o nome da agregação
            let oBinding = oLista.getBinding("items");
            //chama o método de filtro
            oBinding.filter(oFiltroComposto);
        },

        aoSelecionarParceiro: function(oEvent){
            //acessa o objeto do item clicado
            let oItemClicado = oEvent.getParameters().listItem;

            //acessa o contexto de binding (o caminho no modelo OData para o item clicado)
            let oBindingContext = oItemClicado.getBindingContext();

            //acessa a entrada do item selecionado no modelo
            let oParceiro = oBindingContext.getObject();

            //guarda o ID para usar na navegação
            let sIdParceiro = oParceiro.BusinessPartner;

            //acessa o roteador
            let oRoteador = this.getOwnerComponent().getRouter();

            //efetua a navegação
            oRoteador.navTo("RouteDetalheParceiro", {
                idParceiro: sIdParceiro
            });


        },

        aoCriarParceiro: function(){
            //acessa o roteador
            let oRoteador = this.getOwnerComponent().getRouter();

            //navegação para a página de criação
            oRoteador.navTo("RouteNovoParceiro");
        }

    });
});
