import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import SubMenu from '../common/SubMenu';
import AdminCategoryTableElement from '../categories/adminCategoryEl';

const categories_endpoint = 'admin/categories';

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        fetcher.get(categories_endpoint, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                categories: res.categories
            });
        });
    }
    
    render() {
        return (
            <div className="container">
                <SubMenu />
                <div className="row">
                    <table id="admin-table">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>Title</th>
                                <th>Posts In</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category, index) => <AdminCategoryTableElement {...category} key={index + 1} index={index + 1}/>)}
                        </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}