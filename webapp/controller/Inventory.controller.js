sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"Mobile/Mobilestore/model/Formatter",
	"sap/ui/model/json/JSONModel"
], function (Controller, jQuery, Formatter, JSONModel) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Inventory", {

		formatter: Formatter,
		onPopinLayoutChanged: function (event) {

			var olist1 = event.getSource().getProperty("selectedKey");

			var oModel = this.getView().getModel("data");

			if (olist1 === "acessories") {

				// var points = oModel.oData.accessories;
				oModel.setProperty("/mobiles", oModel.oData.accessories);

			} else if (olist1 === "mobile") {

				// var points1 = oModel.oData.accessories;
				oModel.setProperty("/mobiles", oModel.oData.mobiles);

			}
		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		onInit: function () {

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
		onPress: function (oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Billing");
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf Mobile.Mobilestore.view.Inventory
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Mobile.Mobilestore.view.Inventory
		 */
		//	onExit: function() {
		//
		//	}

	


	});

});