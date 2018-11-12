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
			var obj2 = {
				title: {
					text: "RECHARGE STATISTICS"
				}
			};	var obj1 = {
				title: {
					text: "STOCK STATISTICS"
				}
			};
			this.getView().byId("idVizFrame").setVizProperties(obj2);
			this.getView().byId("idVizFrame1").setVizProperties(obj1);

		},
		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Inventory");
		},
		onOrientationChange: function (oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {
				duration: 5000
			});
		},
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