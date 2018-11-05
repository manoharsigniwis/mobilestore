sap.ui.define(function () {
	"use strict";

	var Formatter = {

		availableState: function (sStateValue) {
			// var sStateValueToLower = sStateValue.toLowerCase();

			switch (sStateValue) {
			case "In Stock":
				return 8;
			case "Out of Stock":
				return 3;
			case "Low Stock":
				return 1;
			case "Fast Selling":
				return 7;
			default:
				return 9;
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);