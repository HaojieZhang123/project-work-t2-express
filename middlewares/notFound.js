function notFound(req, res, next) {
  res.status(404).json({
    status: 'fail',
    message: 'Not Found',
  });
}


module.exports = notFound; // esporta la funzione per l'uso in altri file