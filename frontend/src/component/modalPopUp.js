import React, {Component} from 'react'
import Modal from 'react-modal'

class ModalPopUpButton extends Component {
    render() {
        return (
            <div className="model-pop-up">
                <button onClick={() => this.props.openModel(true)}>{this.props.triggerName}</button>
                <Modal
                    isOpen={this.props.isOpen}
                    contentLabel="Example Modal"
                >
                    {this.props.children}
                    <button onClick={() => this.props.openModel(false)}>close</button>
                </Modal>
            </div>
        )
    }
}

export default ModalPopUpButton;