sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	"sap/ui/core/routing/History",
	'sap/m/MessageToast'

], function (Controller, JSONModel, ChartFormatter, History, MessageToast) {
	"use strict";
	return Controller.extend("Mobile.Mobilestore.controller.Home", {
		onInit: function () {
			var oModel = this.getView().getModel("data");
			// var val1 = oModel.getProperty("/count").value;
			// var val2 = oModel.getProperty("/rech").value;
			// var val3 = val1 + val2;
			// oModel.setProperty("/trans", val3);

			var obj2 = {
				title: {
					text: "RECHARGE STATISTICS"
				}
			};
			var obj1 = {
				title: {
					text: "PRODUCT STATISTICS"
				}
			};
			this.getView().byId("idVizFrame").setVizProperties(obj2);
			this.getView().byId("idVizFrame1").setVizProperties(obj1);

		},

		// Logout function which will navigate to the login view with a message "You Have Been Logged Out".

		onLogout: function (event) {
			MessageToast.show("You Have Been Logged Out");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Login");

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