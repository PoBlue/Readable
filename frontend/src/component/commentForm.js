import React, {Component} from 'react'
import ModalPopUpButton from './modalPopUp'
import serializeForm from 'form-serialize'
import {commentCreator} from '../api/Creator'
import {mapCommentDispatchToProps} from '../dispatches/dispatches'
import { connect } from 'react-redux'

class CommentForm extends Component {
    state = {
        modalIsOpen: false,
        canSubmit: true,
        errorMessage: ""
    }

    openModel(isOpen) {
        this.setState({ modalIsOpen: isOpen })
    }

    submitHandler(e) {
        e.preventDefault();
        const value = serializeForm(e.target, {hash: true})
        if( !(value.author && value.body) ) {
            this.setState({ errorMessage: "Please input all filed"})
            return;
        }
        if(this.props.editorMode) {
            const upadteComment = {
                ...this.props.comment,
                "author": value.author,
                "body": value.body,
            }
            this.props.updateComment(upadteComment)
        } else {
            const comment = commentCreator(value.body, value.author, this.props.postId);
            this.props.createComment(comment)
        }
        this.openModel(false)
    }

    render() {
        let comment = this.props.comment
        if (!comment) comment = {};
        const buttonName = this.props.editorMode? 'edit' : 'create'
        const {body, author} = comment
        return (
            <div id="comment-form">
                <ModalPopUpButton triggerName={buttonName}
                    isOpen={this.state.modalIsOpen}
                    openModel={this.openModel.bind(this)}
                >
                    <h1>Create Comment</h1>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <textarea name="body" id="post-content"
                            cols="30" rows="10"
                            placeholder="Comment Content"
                            defaultValue={body}
                        />
                        <br/>
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" defaultValue={author}/>
                        <br/>
                        <input type="submit" name="create" disabled={!this.state.canSubmit}/>
                    </form>
                    <p className="error-msg">{this.state.errorMessage}</p>
                </ModalPopUpButton>
            </div>
        )
    }
}

export default connect(undefined, mapCommentDispatchToProps)(CommentForm);