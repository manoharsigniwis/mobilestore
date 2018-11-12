sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageToast'

], function (Controller, History, MessageToast) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Transaction", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Mobile.Mobilestore.view.Transaction
		 */
		onInit: function () {
			var obj = {
				title: {
					text: "SALES STATISTICS"
				}
			};
			this.getView().byId("idVizFrame1").setVizProperties(obj);
		},
		onLogout: function (event) {
			MessageToast.show("You Have Been Logged Out");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Login");

		},
		onLogout: function (event) {
			MessageToast.show("You Have Been Logged Out");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Login");

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
			oRouter.navTo("Recharge");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Mobile.Mobilestore.view.Transaction
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Mobile.Mobilestore.view.Transaction
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Mobile.Mobilestore.view.Transaction
		 */
		//	onExit: function() {
		//
		//	}

	});

});