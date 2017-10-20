import React, {Component} from 'react'
import ModalPopUpButton from './modalPopUp'
import serializeForm from 'form-serialize'
import {postCreator} from '../api/Creator'
import {mapPostDispatchToProps} from '../dispatches/dispatches'
import { connect } from 'react-redux'

class PostForm extends Component {
    state = {
        modalIsOpen: false,
        canSubmit: true,
        errorMessage: "",
    }

    openModel(isOpen) {
        this.setState({ modalIsOpen: isOpen })
    }

    submitHandler(e) {
        e.preventDefault();
        const value = serializeForm(e.target, {hash: true})
        if( !(value.author && value.body && value.title) ) {
            this.setState({ errorMessage: "Please input all filed"})
            return;
        }
        if(this.props.editorMode) {
            const upadtePost = {
                ...this.props.post,
                "author": value.author,
                "body": value.body,
                "title": value.title
            }
            this.props.updatePost(upadtePost)
        } else {
            const post = postCreator(value.body, value.author, value.title, this.props.category);
            this.props.createPost(post)
        }
        this.openModel(false)
    }

    render() {
        let post = this.props.post
        if (!post) post = {};
        const buttonName = this.props.editorMode? 'edit' : 'create'
        const {body, author, title} = post
        return (
            <div id="post-form">
                <ModalPopUpButton triggerName={buttonName}
                    isOpen={this.state.modalIsOpen}
                    openModel={this.openModel.bind(this)}
                >
                    <h1>Create Post</h1>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" defaultValue={title}/>
                        <br/>
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

export default connect(undefined, mapPostDispatchToProps)(PostForm);