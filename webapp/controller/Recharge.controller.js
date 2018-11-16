sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/MessageBox"

], function (Controller, History, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("Mobile.Mobilestore.controller.Recharge", {

		onBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home");
		},

		onInit: function () {

			this._aArray = [];
		},
		ErrorMessageBoxPress: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.error(
				"Enter Valid 10 digit Mobile Number", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
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
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
			}
		},

		onPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail");
		},
		handleErrorMessageBoxPress: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.error(
				"You don't have sufficient balance to Recharge", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		},
		handleSuccessMessageBoxPress: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.success(
				"Mobile Number " + this.mobilenumber + "  of Amount Rs.  " + this.enterdam + "  is Successfull", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		},
		phonenumber: function (event) {
			var num = this.getView().byId("mob").getValue();
			var phoneno = /^\d{10}$/;
			if (num.match(phoneno)) {
				return true;
			} else {
				this.ErrorMessageBoxPress();
				return false;
			}

		},
		clearform: function () {
			this.getView().byId("mob").setValue(" ");
			this.getView().byId("i").setValue(" ");
			this.getView().byId("i1").setValue(" ");

		},
		onRecharge: function (event) {
			var mod = this._aArray;
			var dd = this.getView().byId("mob").getValue();

			var oModel = this.getView().getModel("data"),
				bal = oModel.oData.recharge,
				op = this.getView().byId("i").getValue(),
				inp = this.getView().byId("i1").getValue();
			this.mobilenumber = dd;
			this.enterdam = inp;

			switch (op) {
			case "JIO":

				var orginal = oModel.oData.recharge[1].balance;
				if (inp <= orginal) {
					this.handleSuccessMessageBoxPress(op);
					var ded = orginal - inp;
					var j = oModel.setProperty("/recharge/1/balance", ded);
					this.clearform();
				} else {
					this.handleErrorMessageBoxPress();
				}

				break;
			case "AIRTEL":
				var orginal1 = oModel.oData.recharge[0].balance;
				if (inp <= orginal1) {
					this.handleSuccessMessageBoxPress();
					var ded1 = orginal1 - inp;
					var j1 = oModel.setProperty("/recharge/0/balance", ded1);
					this.clearform();

				} else {
					this.handleErrorMessageBoxPress();
				}

				break;
			case "VODAFONE":
				var orginal2 = oModel.oData.recharge[2].balance;
				if (inp <= orginal2) {
					this.handleSuccessMessageBoxPress();
					var ded2 = orginal2 - inp;

					var j2 = oModel.setProperty("/recharge/2/balance", ded2);
					this.clearform();
				} else {
					this.handleErrorMessageBoxPress();
				}

				break;
			case "BSNL":
				var orginal3 = oModel.oData.recharge[3].balance;
				if (inp <= orginal3) {
					this.handleSuccessMessageBoxPress();
					var ded3 = orginal3 - inp;

					var j3 = oModel.setProperty("/recharge/3/balance", ded3);
					this.clearform();
				} else {
					this.handleErrorMessageBoxPress();
				}
				break;

			}
			mod.push(inp);
			oModel.setProperty("/rech", mod.length);
			// oModel.setProperty("/balance", bal);
		},

		//	onBeforeRendering: function() {
		//
		//	},

		//	onAfterRendering: function() {
		//
		//	},

		//	onExit: function() {
		//
		//	}

	});

});