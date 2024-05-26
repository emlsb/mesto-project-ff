function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`);
}



function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
   evt.preventDefault();
 
   const submitButton = evt.submitter;
   const initialText = submitButton.textContent;
   renderLoading(true, submitButton, initialText, loadingText);
   request()
     .then(() => {
       evt.target.reset();
     })
     .catch((err) => {
       console.error(`Ошибка: ${err}`);
     })
}

export {renderLoading, checkResponse, handleSubmit}