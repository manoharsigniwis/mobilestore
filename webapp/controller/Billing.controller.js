<<<<<<< Upstream, based on origin/master
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel"

], function (Controller, History, Filter, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("Mobile.Mobilestore.controller.Billing", {
		onInit: function () {
			this._aArray = [];
			var rand = Math.floor((Math.random() * 100000) + 1);
			this.getView().byId("oid").setValue(rand);
			var currentDate = new Date();
			this.byId("date").setDateValue(currentDate);
		},

		// Logout function which will navigate to the login view with a message "You Have Been Logged Out".

		onLogout: function (event) {
			MessageToast.show("You Have Been Logged Out");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Login");

		},

		//Back navigation: Function to navigate to the previous view 

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

		//Coupon function: In which the specific coupon price is applied for a specific coupon with the use of random()

		onCoupon: function (oevent) {
			var randc = Math.floor((Math.random() * 100) + 1),
				couponPrice = "";

			var coupon = this.getView().byId("coupon").getValue();

			if (coupon === "Save@200") {
				couponPrice = 200;
			} else if (coupon === "FestiveOffer") {
				couponPrice = randc;
			} else if (coupon === "BigSale") {
				couponPrice = randc;
			} else if (coupon === "Offer@300") {
				couponPrice = 300;
			} else if (coupon === "FlatOffer") {
				couponPrice = randc;
			} else {
				couponPrice = 0;
				alert("Invalid Coupon code");
			}
			var amount = this.getView().byId("price").getValue();
			var discount = amount - couponPrice;
			this.getView().byId("tprice").setValue(discount);
			this.couponPrice = couponPrice;

		},

		onCategory: function (oevent) {
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "newModel");
			var key = oevent.getSource().getProperty("selectedKey"),
				oModel = this.getView().getModel("data"),
				NewJsonModel = this.getView().getModel("newModel");

			if (key === "accessories") {
				NewJsonModel.setProperty("/values", oModel.oData.brandaccs);
				this.getView().byId("amodel").setVisible(true);
				this.getView().byId("model").setVisible(false);
			} else {
				NewJsonModel.setProperty("/values", oModel.oData.brands);
				this.getView().byId("model").setVisible(true);
				this.getView().byId("amodel").setVisible(false);

			}
		},

		//Brand Change function: On change of specific brand the specified brand models will display in combobox

		// onBrandChange: function (oevent) {

		//            var afilter = [];
		//            var sQuery = oevent.getParameters().value;
		//            if (sQuery && sQuery.length > 0) {
		//                            var filter = new Filter("model", sap.ui.model.FilterOperator.Contains, sQuery);
		//                            afilter.push(filter);
		//            }
		//            var otable = this.byId("model");
		//            var binding = otable.getBinding("items");
		//            binding.filter(afilter);

		// },
		onAccBrandchange: function (oevent) {
			var key = this.getView().byId("category").getProperty("selectedKey");
			if (key === "accessories") {
				var mafilter = [];
				var msQuery = oevent.getParameters().value;
				if (msQuery && msQuery.length > 0) {
					var mfilter = new Filter("model", sap.ui.model.FilterOperator.Contains, msQuery);
					mafilter.push(mfilter);
				}
				var motable = this.getView().byId("amodel");
				var mbinding = motable.getBinding("items");
				mbinding.filter(mafilter);
			} else {
				var afilter = [];
				var sQuery = oevent.getParameters().value;
				if (sQuery && sQuery.length > 0) {
					var filter = new Filter("model", sap.ui.model.FilterOperator.Contains, sQuery);
					afilter.push(filter);
				}
				var otable = this.byId("model");
				var binding = otable.getBinding("items");
				binding.filter(afilter);
			}
		},
		//Model Change:Onselecting the particular model the model price will display in the next input field

		onModelChange: function (oevent) {

			var model = oevent.getSource().getProperty("selectedKeys"),
				odataModel = this.getView().getModel("newModel"),
				totalPrice = 0;
			this.priceArr = [];
			this.jArr = [];

			var comp = oevent.getSource().getBinding("items").oList;
			for (var i = 0; i < comp.length; i++) {
				for (var j = 0; j < model.length; j++) {

					if (comp[i].model === model[j]) {

						totalPrice = totalPrice + comp[i].price;
						this.priceArr.push(comp[i].price.toString());
						odataModel.setProperty("/newValue", totalPrice);
						odataModel.setProperty("/newValue", totalPrice);
						this.getView().byId("pno").setValue(j + 1);
						this.jArr.push((j + 1).toString());
					}
				}
			}
		},

		onAccChange: function (oevent) {

			var model = oevent.getSource().getProperty("selectedKeys"),
				odataModel = this.getView().getModel("newModel"),
				totalPrice = 0;
			this.priceArr = [];
			this.jArr = [];

			var comp = oevent.getSource().getBinding("items").oList;
			for (var i = 0; i < comp.length; i++) {
				for (var j = 0; j < model.length; j++) {

					if (comp[i].model === model[j]) {

						totalPrice = totalPrice + comp[i].price;
						this.priceArr.push(comp[i].price.toString());
						odataModel.setProperty("/newValue", totalPrice);
						odataModel.setProperty("/newValue", totalPrice);
						this.getView().byId("pno").setValue(j + 1);
						this.jArr.push((j + 1).toString());
					}
				}
			}
		},
		clearform: function () {
			this.getView().byId("oid").setValue(" ");
			this.getView().byId("date").setValue(" ");
			this.getView().byId("name").setValue(" ");
			this.getView().byId("mobile").setValue(" ");
			this.getView().byId("category").setValue(" ");
			this.getView().byId("pno").setValue(" ");
			this.getView().byId("brand").setValue(" ");
			this.getView().byId("model").setValue(" ");
			this.getView().byId("category").setValue(" ");
			this.getView().byId("amodel").setValue(" ");
			this.getView().byId("price").setValue(" ");
			this.getView().byId("coupon").setValue(" ");
			this.getView().byId("category").setValue(" ");
			this.getView().byId("tprice").setValue(" ");

		},

		//JSPDF function: Onsubmitting the form(Invoice) pdf ill generate with the help of jsPDF library

		onSubmit: function (oevent) {
			var mod = this._aArray;
			var tra = [];
			var oModel = this.getView().getModel("data");

			var doc = new jsPDF("landscape");
			doc.setFillColor(51, 51, 51);
			doc.rect(15, 15, 265, 180, "FD");

			doc.setFontType("bold");
			doc.setFontSize(20);
			doc.setTextColor(255, 255, 255);
			doc.text('Signiwis Mobiles', 126, 30);
			// doc.setFontSize(10);
			// doc.text('RajajiNagar 2 Block, Bengaluru', 120, 40);
			var name = this.getView().byId("name").getValue();
			var mobile = this.getView().byId("mobile").getValue();
			var oid = this.getView().byId("oid").getValue();
			var pno = this.getView().byId("pno").getValue();
			// var price = this.getView().byId("parr").getProperty("value");
			var tprice = this.getView().byId("tprice").getValue();
			var date = this.getView().byId("date").getValue();
			var coupon = this.couponPrice.toString();

			var brand = this.getView().byId("brand").getProperty("selectedKey");
			var cat = this.getView().byId("category").getValue();
			if (cat === "Accessories") {
				var model = this.getView().byId("amodel").getProperty("selectedKeys");
			} else {
				var model = this.getView().byId("model").getProperty("selectedKeys");
			}

			var imgdata =
				"data:image/png;base64,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";
			doc.addImage(imgdata, 'JPEG', 15, 15, 40, 15);
			doc.setFillColor(255, 255, 255);
			doc.rect(15, 40, 265, 160, "FD");
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.setTextColor(0, 0, 0);
			doc.text('INVOICE', 140, 50);
			doc.text('Customer Name:', 20, 60);
			doc.text(name, 70, 60);

			doc.text('Mobile No:', 20, 70);
			doc.text(mobile, 70, 70);

			doc.text('Date:', 200, 60);
			doc.text(date, 240, 60);

			doc.text('Order ID:', 200, 70);
			doc.text(oid, 240, 70);

			doc.setFillColor(255, 255, 255);
			doc.rect(16, 80, 263, 90, "FD");

			doc.setFillColor(51, 51, 51);
			doc.rect(16, 80, 263, 18, "FD");
			doc.setTextColor(255, 255, 255);

			doc.text('Product No', 23, 90);

			doc.line(60, 80, 60, 170);
			doc.text('Description', 90, 90);

			doc.line(150, 80, 150, 170);
			doc.text('Price', 165, 90);

			doc.line(190, 80, 190, 170);
			doc.text('Discount', 198, 90);

			doc.line(230, 80, 230, 170);
			doc.text('Total Amount', 235, 90);

			//            doc.line(16, 88, 279, 88);
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.setTextColor(0, 0, 0);

			doc.text(this.jArr, 23, 110);
			// doc.text(brand, 90, 110);
			doc.text(model, 75, 110);
			doc.text(this.priceArr, 165, 110);
			doc.text(coupon, 198, 110);
			doc.text(tprice, 245, 110);

			doc.setFontType("bold");
			doc.setFontSize(18);
			doc.setTextColor(0, 0, 0);

			doc.text('Signiwis Mobiles', 17, 180);
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.text('Contact: 9797979797', 17, 190);
			doc.text('Authorised Signature', 228, 190);

			// doc.setFontSize(10);
			doc.save('a4.pdf');
			tra.push(tprice);
			// for (var i = 0; i < tra["length"]; i++) {
			//       // tra.reduce(this.getSum(tra[i]));
			//       tra.reduce((this.add()), 0);

			// }

			var obj = {
				name: name,
				mobile: mobile,
				order: oid,
				productnum: pno,
				// price: price,
				total: tprice,
				model: model,
				date: date
			};
			mod.push(obj);

			oModel.setProperty("/object", mod);
			oModel.setProperty("/count", mod.length);
			oModel.setProperty("/trans", obj.total);
			this.clearform();
			this.onInit();

			//       console.log(this.getView().byId("name").getValue());
		}

	});

=======
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel"

], function (Controller, History, Filter, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("Mobile.Mobilestore.controller.Billing", {
		onInit: function () {
			this._aArray = [];
			var rand = Math.floor((Math.random() * 100000) + 1);
			this.getView().byId("oid").setValue(rand);
			var currentDate = new Date();
			this.byId("date").setDateValue(currentDate);
		},

		// Logout function which will navigate to the login view with a message "You Have Been Logged Out".

		onLogout: function (event) {
			MessageToast.show("You Have Been Logged Out");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Login");

		},

		//Back navigation: Function to navigate to the previous view 

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

		//Coupon function: In which the specific coupon price is applied for a specific coupon with the use of random()

		onCoupon: function (oevent) {
			var randc = Math.floor((Math.random() * 100) + 1),
				couponPrice = "";

			var coupon = this.getView().byId("coupon").getValue();

			if (coupon === "Save@200") {
				couponPrice = 200;
			} else if (coupon === "FestiveOffer") {
				couponPrice = randc;
			} else if (coupon === "BigSale") {
				couponPrice = randc;
			} else if (coupon === "Offer@300") {
				couponPrice = 300;
			} else if (coupon === "FlatOffer") {
				couponPrice = randc;
			} else {
				couponPrice = 0;
				alert("Invalid Coupon code");
			}
			var amount = this.getView().byId("price").getValue();
			var discount = amount - couponPrice;
			this.getView().byId("tprice").setValue(discount);
			this.couponPrice = couponPrice;

		},

		onCategory: function (oevent) {
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "newModel");
			var key = oevent.getSource().getProperty("selectedKey"),
				oModel = this.getView().getModel("data"),
				NewJsonModel = this.getView().getModel("newModel");

			if (key === "accessories") {
				NewJsonModel.setProperty("/values", oModel.oData.brandaccs);
				this.getView().byId("amodel").setVisible(true);
				this.getView().byId("model").setVisible(false);
			} else {
				NewJsonModel.setProperty("/values", oModel.oData.brands);
				this.getView().byId("model").setVisible(true);
				this.getView().byId("amodel").setVisible(false);

			}
		},

		//Brand Change function: On change of specific brand the specified brand models will display in combobox

		// onBrandChange: function (oevent) {

		// 	var afilter = [];
		// 	var sQuery = oevent.getParameters().value;
		// 	if (sQuery && sQuery.length > 0) {
		// 		var filter = new Filter("model", sap.ui.model.FilterOperator.Contains, sQuery);
		// 		afilter.push(filter);
		// 	}
		// 	var otable = this.byId("model");
		// 	var binding = otable.getBinding("items");
		// 	binding.filter(afilter);

		// },
		onAccBrandchange: function (oevent) {
			var key = this.getView().byId("category").getProperty("selectedKey");
			if (key === "accessories") {
				var mafilter = [];
				var msQuery = oevent.getParameters().value;
				if (msQuery && msQuery.length > 0) {
					var mfilter = new Filter("model", sap.ui.model.FilterOperator.Contains, msQuery);
					mafilter.push(mfilter);
				}
				var motable = this.getView().byId("amodel");
				var mbinding = motable.getBinding("items");
				mbinding.filter(mafilter);
			} else {
				var afilter = [];
				var sQuery = oevent.getParameters().value;
				if (sQuery && sQuery.length > 0) {
					var filter = new Filter("model", sap.ui.model.FilterOperator.Contains, sQuery);
					afilter.push(filter);
				}
				var otable = this.byId("model");
				var binding = otable.getBinding("items");
				binding.filter(afilter);
			}
		},
		//Model Change:Onselecting the particular model the model price will display in the next input field

		onModelChange: function (oevent) {

			var model = oevent.getSource().getProperty("selectedKeys"),
				odataModel = this.getView().getModel("newModel"),
				totalPrice = 0;
			this.priceArr = [];
			this.jArr = [];

			var comp = oevent.getSource().getBinding("items").oList;
			for (var i = 0; i < comp.length; i++) {
				for (var j = 0; j < model.length; j++) {

					if (comp[i].model === model[j]) {

						totalPrice = totalPrice + comp[i].price;
						this.priceArr.push(comp[i].price.toString());
						odataModel.setProperty("/newValue", totalPrice);
						odataModel.setProperty("/newValue", totalPrice);
						this.getView().byId("pno").setValue(j + 1);
						this.jArr.push((j + 1).toString());
					}
				}
			}
		},

		onAccChange: function (oevent) {

			var model = oevent.getSource().getProperty("selectedKeys"),
				odataModel = this.getView().getModel("newModel"),
				totalPrice = 0;
			this.priceArr = [];
			this.jArr = [];

			var comp = oevent.getSource().getBinding("items").oList;
			for (var i = 0; i < comp.length; i++) {
				for (var j = 0; j < model.length; j++) {

					if (comp[i].model === model[j]) {

						totalPrice = totalPrice + comp[i].price;
						this.priceArr.push(comp[i].price.toString());
						odataModel.setProperty("/newValue", totalPrice);
						odataModel.setProperty("/newValue", totalPrice);
						this.getView().byId("pno").setValue(j + 1);
						this.jArr.push((j + 1).toString());
					}
				}
			}
		},

		//JSPDF function: Onsubmitting the form(Invoice) pdf ill generate with the help of jsPDF library

		onSubmit: function (oevent) {
			var mod = this._aArray;

			var oModel = this.getView().getModel("data");

			var doc = new jsPDF("landscape");
			doc.setFillColor(51, 51, 51);
			doc.rect(15, 15, 265, 180, "FD");

			doc.setFontType("bold");
			doc.setFontSize(20);
			doc.setTextColor(255, 255, 255);
			doc.text('Signiwis Mobiles', 126, 30);
			// doc.setFontSize(10);
			// doc.text('RajajiNagar 2 Block, Bengaluru', 120, 40);
			var name = this.getView().byId("name").getValue();
			var mobile = this.getView().byId("mobile").getValue();
			var oid = this.getView().byId("oid").getValue();
			var pno = this.getView().byId("pno").getValue();
			// var price = this.getView().byId("parr").getProperty("value");
			var tprice = this.getView().byId("tprice").getValue();
			var date = this.getView().byId("date").getValue();
			var coupon = this.couponPrice.toString();

			var brand = this.getView().byId("brand").getProperty("selectedKey");
			var cat = this.getView().byId("category").getValue();
			if (cat === "Accessories") {
				var model = this.getView().byId("amodel").getProperty("selectedKeys");
			} else {
				var model = this.getView().byId("model").getProperty("selectedKeys");
			}

			var imgdata =
				"data:image/png;base64,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";
			doc.addImage(imgdata, 'JPEG', 15, 15, 40, 15);
			doc.setFillColor(255, 255, 255);
			doc.rect(15, 40, 265, 160, "FD");
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.setTextColor(0, 0, 0);
			doc.text('INVOICE', 140, 50);
			doc.text('Customer Name:', 20, 60);
			doc.text(name, 70, 60);

			doc.text('Mobile No:', 20, 70);
			doc.text(mobile, 70, 70);

			doc.text('Date:', 200, 60);
			doc.text(date, 240, 60);

			doc.text('Order ID:', 200, 70);
			doc.text(oid, 240, 70);

			doc.setFillColor(255, 255, 255);
			doc.rect(16, 80, 263, 90, "FD");

			doc.setFillColor(51, 51, 51);
			doc.rect(16, 80, 263, 18, "FD");
			doc.setTextColor(255, 255, 255);

			doc.text('Product No', 23, 90);

			doc.line(60, 80, 60, 170);
			doc.text('Description', 90, 90);

			doc.line(150, 80, 150, 170);
			doc.text('Price', 165, 90);

			doc.line(190, 80, 190, 170);
			doc.text('Discount', 198, 90);

			doc.line(230, 80, 230, 170);
			doc.text('Total Amount', 235, 90);

			//	doc.line(16, 88, 279, 88);
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.setTextColor(0, 0, 0);

			doc.text(this.jArr, 23, 110);
			// doc.text(brand, 90, 110);
			doc.text(model, 75, 110);
			doc.text(this.priceArr, 165, 110);
			doc.text(coupon, 198, 110);
			doc.text(tprice, 245, 110);

			doc.setFontType("bold");
			doc.setFontSize(18);
			doc.setTextColor(0, 0, 0);

			doc.text('Signiwis Mobiles', 17, 180);
			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.text('Contact: 9797979797', 17, 190);
			doc.text('Authorised Signature', 228, 190);

			// doc.setFontSize(10);
			doc.save('a4.pdf');
			// console.log(model);
			// console.log(this.priceArr);
			var obj = {
				name: name,
				mobile: mobile,
				order: oid,
				productnum: pno,
				// price: price,
				total: tprice,
				model: model,
				date: date
			};
			mod.push(obj);
			oModel.setProperty("/object", mod);
			oModel.setProperty("/count", mod.length);

			//	console.log(this.getView().byId("name").getValue());
		}

	});

>>>>>>> acb6019 ff
});