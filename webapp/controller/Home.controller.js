sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	"sap/ui/core/routing/History"

], function (Controller, JSONModel, ChartFormatter, History) {
	"use strict";
	return Controller.extend("Mobile.Mobilestore.controller.Home", {
		onInit: function () {},
		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Inventory");
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
		OnIconPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var iconId = oEvent.getParameters().id.substr(12);
			
			var rout;
			switch (iconId) {
			case "ib":
				rout = "Billing";
				break;
			case "ir":
				rout = "Recharge";
				break;
			case "is":
				rout = "serviceBilling";
				break;
			case "ii":
				rout = "Inventory";
				break;
			case "it":
				rout = "Transaction";
				break;
			}
			oRouter.navTo(rout);
		},
		
			OnPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var iconIdl = oEvent.getParameters().id.substr(12);
			
			var routl;
			switch (iconIdl) {
			case "ibl":
				routl = "Billing";
				break;
			case "irl":
				routl = "Recharge";
				break;
			case "isl":
				routl = "serviceBilling";
				break;
			case "iil":
				routl = "Inventory";
				break;
			case "itl":
				routl = "Transaction";
				break;
			}
			oRouter.navTo(routl);
		}


	});
});