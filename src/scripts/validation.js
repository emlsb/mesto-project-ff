//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

//Скрыть ошибку
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input-error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = ''
}


function checkValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  else {
    hideInputError(formElement, inputElement);
  }
};

// function setEventListeners (formElement) {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   inputList.forEach((inputElement) => {
//   inputElement.addEventListener('input', function () {
//       checkValidity(formElement, inputElement);
//     });
//   });
// }

// setEventListeners(editForm)

export {showInputError, hideInputError, checkValidity}