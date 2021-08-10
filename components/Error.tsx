function Error() {
  return (
    <div className="message-container" id="error">
      <div className="message">
        <h3 className="message-header">Sorry</h3>
        <p>
          It seems like there was an error with our servers, we're working to
          solve it as soon as possible.
        </p>
      </div>
    </div>
  );
}

export default Error;
