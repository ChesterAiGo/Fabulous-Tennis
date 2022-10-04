function showErrorMessage(error) {
  return <div className="alert alert-danger">{error}</div>;
}
function showSuccessMessage(success) {
  return <div className="alert alert-success">{success}</div>;
}
module.exports = {
  showSuccessMessage,
  showErrorMessage
};
