function errorsHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
}

module.exports = errorsHandler; // esporta la funzione per l'uso in altri file