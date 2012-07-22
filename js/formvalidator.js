/*	
*	TODO 
*	- dynamically create a span indicating (*) are required fields
*	- create a validation for radio button
*	- create a validation for checkbox
*	- create a validation for dropdown
*	- create a validation for textarea
*	- create a validation for dates. "not less than problem" (datepicker)
*/

(function( $ ) {
	
		$.fn.validateFields = function( options ) {

			var defaults = {
				'emptyFieldBgColor' : '#FF6B6B',
				'errorMessageContainerId' : 'error-msg-container',
				'errorMessage' : 'Please complete the form'
			};

			var settings = $.extend(defaults, options);
			var selectedForm = this;
			var errorMessageContainer = $('div#'+settings.errorMessageContainerId);
			var errorMessageSpan = $('span.ui-icon.ui-icon-alert', errorMessageContainer);
			
			initForm();

			return this.submit(function() {
				var currentElement;
				var formValid = true;
				$('.required', this).each(function() {
					currentElement = this;
					if ($(currentElement).is('input[type="text"]')) {
						if ( fieldIsEmpty( $(currentElement).val() ) ) {
							changeBackgroundColor(currentElement);
							formValid = false;
						} else {
							returnBackgroundColor(currentElement);
						}
					}
					if ($(currentElement).is('select')) {
						if (fieldIsEmpty($(':selected', currentElement).val())) {
							changeBackgroundColor(currentElement);
							formValid = false;
						} else {
							returnBackgroundColor(currentElement);
						}
					}
				});	

				if (!formValid) {
					showErrorMessage();
				} else {
					errorMessageContainer.hide();
				}
				return formValid;
			});

			function returnBackgroundColor(element) {
				$(element).css('background-color', 'white');
			}

			function changeBackgroundColor(element) {
				$(element).css('background-color', settings.emptyFieldBgColor);
			}

			function fieldIsEmpty(fieldValue) {
				fieldValue = $.trim(fieldValue);
				if (fieldValue == null) {
					return true;
				}
				if (fieldValue == '') {
					return true;
				}
				if (fieldValue.length == 0) {
					return true;
				}
				return false;
			}

			function showErrorMessage() {
				constructErrorMessage();
				errorMessageContainer.show();
			}

			function constructErrorMessage() {
				errorMessageSpan.after('').after('<strong>' +  settings.errorMessage + '</strong>');
			}

			function initForm() {
				selectedForm.find('.required').each(function() {
					$(this).parent().find('label').append('<span style="color: red;">*</span>');
				});
				errorMessageContainer.hide();
			};
		};

})( jQuery );
