sap.ui.define([
	"sap/ui/core/Control",
	"sap/tnt/NavigationListItem"

], function (Control, NavigationListItem) {
	"use strict";
	return Control.extend("Mobile.Mobilestore.controller.control.product", {
		metadata: {
			properties: {
				height: {
					type: "char",
					defaultValue: 0
				}
			}

		},
		init: function () {},
		renderer: function (oRM, oControl) {}
	});
});