
const Modal = ({setOpenModal, text, header}) => {

  return (
    <div>
      <div className="modal-background">
          <div className="modalContainer">

            <div className="modal-header">
              <h1>Oops!</h1>
            </div>

            <div className="modal-body">
              <p className="modalText">{text}<span className="modalImage"><img src="https://media3.giphy.com/media/wPyDWwurn8XEWdR9ol/giphy.gif" alt="astronaut-in-space"/></span></p>
            </div>

            <div className="modal-footer">
              <button className="closeBtn" onClick={() => {setOpenModal(false)}}>Close</button>
            </div>
          </div>
      </div>
    </div>
    )
  }

export default Modal