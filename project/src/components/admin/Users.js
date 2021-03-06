import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import AdminUserTableElement from '../users/AdminUserTableElement';
import SubMenu from '../common/SubMenu';

const users_endpoint = 'admin/allusers';
const disableUsers_endpoint = 'admin/user/changestatus';

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.disableEnableUser = this.disableEnableUser.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetcher.get(users_endpoint, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                users: res.users
            });
        });
    }

    disableEnableUser(id) {
        let body = {
            userId: id
        }
        fetcher.post(disableUsers_endpoint, body, res => {
            debugger
            if (res.error) {
                toast.error(res.error);
                return;
            }

            this.fetchUsers();
            toast.success(res.message);
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
                                <th>Username</th>
                                <th>Number of posts</th>                                
                                <th>Roles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => <AdminUserTableElement {...user} key={index + 1} index={index+1} disable={this.disableEnableUser}/>)}
                        </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}