sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"Mobile/Mobilestore/model/Formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"

], function (Controller, jQuery, Formatter, JSONModel, Fragment, History) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Inventory", {

		formatter: Formatter,
		onPopinLayoutChanged: function (event) {
			// this.setModel(new JSONModel(), "newModel");

			var olist1 = event.getSource().getProperty("selectedKey");

			var oModel = this.getView().getModel("data"),
				NewJsonModel = this.getView().getModel("newModel");

			if (olist1 === "acessories") {

				// var points = oModel.oData.accessories;
				NewJsonModel.setProperty("/mobiles", oModel.oData.accessories);

			} else {

				// var points1 = oModel.oData.accessories;
				NewJsonModel.setProperty("/mobiles", oModel.oData.mobiles);

			}
		},
		onSort: function () {

		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("TargetView1", {}, true /*no history*/ );
			}
		},
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("Mobile.Mobilestore.fragments.filter", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		handleOpenDialog: function () {
			this._getDialog().open();
		},
		handleOpenDialogFilter: function () {
			this._getDialog().open("filter");
		},
		handleConfirm: function (oEvent) {
			var oTable = this.getView().byId("idProductsTable"),
				aSort = [],
				SORTKEY = oEvent.getParameters(SORTKEY).sortItem.getKey(),
				des = oEvent.getParameters(SORTKEY).sortDescending;
			if (des === true) {
				var obinding = oTable.getBinding("items"),
					DESCENDING = true;
				aSort.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING));
				obinding.sort(aSort);
			} else if (des === false) {

				obinding = oTable.getBinding("items");
				aSort.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING));
				obinding.sort(aSort);
			}
		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		onInit: function () {
			// debugger;
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "newModel");
			var oModel = this.getOwnerComponent().getModel("data").oData.mobiles;
				this.getView().getModel("newModel").setProperty("/mobiles", oModel);
			
		},
		back: function (oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf Mobile.Mobilestore.view.Inventory
			 */
			//          onBeforeRendering: function() {
			//
			//          },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		//          onAfterRendering: function() {
		//
		//          },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		//          onExit: function() {
		//
		//          }

	});

});