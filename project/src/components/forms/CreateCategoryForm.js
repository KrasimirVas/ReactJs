import React, { Component } from 'react';
import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const createCategory_endpoint = 'categories/create';

export default class PostCreateForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        fetcher.post(createCategory_endpoint, this.state, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }

            this.setState({title: ''});
            toast.success(`Category ${res.title} was created`);
        });
    }
    render() {
        return (
            <div className="row">
                <div className="offset-4 col-4">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Create Category</h1>
                        <hr/>
                        <div className="form-group text-left">
                            <label htmlFor="title"><b>Title</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Title" name="title" id="title" value={this.state.title} required />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-success" value="Create" />
                    </form>
                </div>
            </div>
        )
    }
}