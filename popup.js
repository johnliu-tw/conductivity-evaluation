function showErrorAlert(title, text) {
  Swal.fire({
      icon: 'error',
      title: title,
      text: text,
  });
}

function showInputAlert(title, confirmButtonText, callback) {
  Swal.fire({
      title: title,
      input: 'number',
      inputAttributes: {
          min: 1,
          step: 1,
      },
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      inputValidator: (value) => {
          if (!value || value < 1) {
              return 'Please enter a valid number!';
          }
      },
  }).then(callback);
}

module.exports = { showErrorAlert, showInputAlert };