sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	'sap/m/MessageToast'

], function (Controller, History, MessageToast) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Recharge", {

		onBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		},
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Mobile.Mobilestore.view.Recharge
		 */
		onInit: function () {
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
			oRouter.navTo("detail");
		},
		onRecharge: function (event) {
			var oModel = this.getView().getModel("data"),
				bal = oModel.oData.recharge,
				op = this.getView().byId("i").getValue(),
				inp = this.getView().byId("i1").getValue();

			switch (op) {
			case "JIO":

				var orginal = oModel.oData.recharge[1].balance;

				var ded = orginal - inp;
				var j = oModel.setProperty("/recharge/1/balance", ded);

				break;
			case "AIRTEL":
				var orginal1 = oModel.oData.recharge[0].balance;

				var ded1 = orginal1 - inp;
				var j1 = oModel.setProperty("/recharge/0/balance", ded1);
				break;
			case "VODAFONE":
				var orginal2 = oModel.oData.recharge[2].balance;

				var ded2 = orginal2 - inp;
				var j2 = oModel.setProperty("/recharge/2/balance", ded2);
				break;
			case "BSNL":
				var orginal3 = oModel.oData.recharge[3].balance;

				var ded3 = orginal3 - inp;
				var j3 = oModel.setProperty("/recharge/3/balance", ded3);
				break;

			}

			// oModel.setProperty("/balance", bal);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Mobile.Mobilestore.view.Recharge
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Mobile.Mobilestore.view.Recharge
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Mobile.Mobilestore.view.Recharge
		 */
		//	onExit: function() {
		//
		//	}

	});

});