sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Login", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Mobile.Mobilestore.view.Login
		 */
		onInit: function () {

		},
		onValidate: function (oEvent) {
			var uName = this.getView().byId("uid").getValue();

			var uPass = this.getView().byId("psw").getValue();

			if (uName === "Admin" && uPass === "Admin@123" ) {
				MessageToast.show("Login Sucessful");

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
			} else if(uName !== " " && uPass !== " ") {
				MessageToast.show("Wrong / Empty credentials");

			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Mobile.Mobilestore.view.Login
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Mobile.Mobilestore.view.Login
		//  */
		// 	onAfterRendering: function() {
		
		// var oModel = this.getView().getModel("data");
		// 	},
			

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Mobile.Mobilestore.view.Login
		 */
			// onExit: function() {
			// 		var oModel = this.getView().getModel("data");
		
			// }

	});

});