import React, {Component} from 'react'
import ModalPopUpButton from './modalPopUp'
import serializeForm from 'form-serialize'
import {postCreator} from '../api/Creator'
import {mapPostDispatchToProps} from '../dispatches/dispatches'
import { connect } from 'react-redux'
import {CATEGORY_REACT, CATEGORY_REDUX, CATEGORY_UDACITY} from './constant'

class PostForm extends Component {
    state = {
        modalIsOpen: false,
        canSubmit: true,
        errorMessage: "",
        category: ""
    }

    
    componentDidMount() {
        this.setState({ category: this.props.category })
    }

    openModel(isOpen) {
        this.setState({ modalIsOpen: isOpen })
    }

    selectHandler(event) {
        let selectValue = event.target.value;
        this.setState({ category: selectValue })
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
                "title": value.title,
                "category": value.category
            }
            if(this.props.post.category !== value.category) {
                this.props.deletePost(this.props.post)
                this.props.createPost(upadtePost)
            } else {
                this.props.updatePost(upadtePost)
            }
        } else {
            const post = postCreator(value.body, value.author, value.title, value.category);
            this.props.createPost(post)
        }
        this.openModel(false)
    }

    render() {
        let { post, buttonName } = this.props
        if (!post) post = {};
        if (!buttonName) buttonName = this.props.editorMode? 'edit' : 'create'
        const {body, author, title} = post
        return (
            <div id="post-form">
                <ModalPopUpButton triggerName={buttonName}
                    isOpen={this.state.modalIsOpen}
                    openModel={this.openModel.bind(this)}
                >
                    <h1>Create Post</h1>
                    <form onSubmit={(e) => this.submitHandler(e)}>
                        <label htmlFor="category">Category: </label>
                        <select name="category" id="caterogy"
                            value={this.state.category}
                            onChange={(event) => this.selectHandler(event)}>
                            <option value="category" disabled>category is</option>
                            <option value={CATEGORY_REACT}>React</option>
                            <option value={CATEGORY_REDUX}>Redux</option>
                            <option value={CATEGORY_UDACITY}>Udacity</option>
                        </select>
                        <br/>
                        <label htmlFor="title">Title: </label>
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