sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/IconPool",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"DemoOrhan/DemoOrhan/model/formatter"
], function (Controller, IconPool, MessageToast, Filter, FilterOperator, JSONModel, formatter) {
	// order of ui define and functions needs to match see above	

	"use strict";

	return Controller.extend("DemoOrhan.DemoOrhan.controller.App", {

		formatter: formatter,

		onShowHello: function () {
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},
		onFilterProducts: function (oEvent) {

			// build filter array
			/*			var aFilter = [],
						
						
							sQuery = oEvent.getParameter("query"),
							// retrieve list control
							oList = this.getView().byId("productsList"),
							// get binding for aggregation 'items'
							oBinding = oList.getBinding("items");

						if (sQuery) {
							aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
						}
						// apply filter. an empty filter array simply removes the filter
						// which will make all entries visible again
						oBinding.filter(aFilter);*/

			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("ProductID", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("productsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onItemSelected: function (oEvent) {

			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");

			oProductDetailPanel.bindElement({
				path: sPath
			});
			this.byId("productDetailsPanel").setVisible(true);
		},

		handleIconTabBarSelect: function () {
			this.byId("simpleFormChange").setBlocked(true);

		},
		handleEdit: function () {
			this.byId("simpleFormChange").setBlocked(false);
			this.setVisible(false);
		},
		handleSave: function () {

		},

		onShowHelloTwo: function () {

			// show message
			MessageToast.show("Simple message");
		},

		onPIChangeValueButtonPressed: function (oEvent) {
			var sSourceId = oEvent.getSource().getId(),
				sButton = 'button',
				iIndexOfButton = sSourceId.indexOf(sButton),
				oProgressIndicator = this.getView().byId(sSourceId.substring(0, iIndexOfButton - 1)),
				sValue = sSourceId.substring(iIndexOfButton + sButton.length);

			oProgressIndicator.setPercentValue(+sValue);
			oProgressIndicator.setDisplayValue(sValue + '%');
		}
	});

});