define([
        'jquery',
        'Magento_Ui/js/model/messageList',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/checkout-data',
        'mage/url',
        'mage/cookies'
    ],
    function ($, GlobalMessageList, Quote, CheckoutData, Url) {

        'use strict';

        return {


            /**
             * Codes
             */

            /**
             * Get payment configuration array.
             *
             * @returns {String}
             */
            getCardPaymentCode: function () {
                return 'checkoutcom_card_payment';
            },

            /**
             * Get payment configuration array.
             *
             * @returns {String}
             */
            getAlternativePaymentsCode: function () {
                return 'checkoutcom_alternative_payments';
            },

            /**
             * Get payment configuration array.
             *
             * @returns {String}
             */
            getApplePayCode: function () {
                return 'checkoutcom_apple_pay';
            },

            /**
             * Get payment configuration array.
             *
             * @returns {String}
             */
            getGooglePayCode: function () {
                return 'checkoutcom_google_pay';
            },

            /**
             * Get payment configuration array.
             *
             * @returns {Array}
             */
            getPaymentMethods: function () {

                return [
                    this.getCardPaymentCode(),
                    this.getAlternativePaymentsCode(),
                    this.getApplePayCode(),
                    this.getGooglePayCode()
                ];

            },


            /**
             * Getters
             */

            /**
             * Gets the field.
             *
             * @param      {string}  code    The code
             * @param      {string}  field   The field
             * @return     {mixed}  The field.
             */
            getField: function(code, field) {

                var value = null;

                if(window.checkoutConfig.payment.hasOwnProperty(code) &&
                    window.checkoutConfig.payment[code].hasOwnProperty(field)) {

                    value = window.checkoutConfig.payment[code][field];

                }

                return value;

            },






            /**
             * Old methods
             */

            /**
             * Get payment configuration array.
             *
             * @returns {Array}
             */
            getPaymentConfig: function () {
                return window.checkoutConfig.payment['checkoutcom_magento2'];
            },

            /**
             * Get payment name.
             *
             * @returns {String}
             */
            getName: function () {
                return this.getPaymentConfig()['module_name'];
            },

            /**
             * Get payment method id.
             *
             * @returns {string}
             */
            getMethodId: function (methodId) {
                return this.getCode() + '_' + methodId;
            },

            /**
             * @returns {string}
             */
            getEmailAddress: function () {
                return window.checkoutConfig.customerData.email || Quote.guestEmail || CheckoutData.getValidatedEmailValue();
            },

            /**
             * @returns {void}
             */
            setCookieData: function (methodId) {
                // Set the email
                $.cookie(
                    this.getPaymentConfig()['email_cookie_name'],
                    this.getEmailAddress()
                );

                // Set the payment method
                $.cookie(
                    this.getPaymentConfig()['method_cookie_name'],
                    methodId
                );
            },

            /**
             * @returns {string}
             */
            getQuoteValue: function () {
                return (Quote.getTotals()().grand_total * 100).toFixed(2);
            },

            /**
             * Show error message
             */
            showMessage: function (type, message) {
                this.clearMessages();
                var messageContainer = $('.message');
                messageContainer.addClass('message-' + type + ' ' + type);
                messageContainer.append('<div>' + message + '</div>');
                messageContainer.show();
            },

            /**
             * Clear messages
             */
            clearMessages: function () {
                var messageContainer = $('.message');
                messageContainer.hide();
                messageContainer.empty();
            },

        };
    }
);
