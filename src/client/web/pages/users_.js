/**
 * Created by liujinhe on 17/1/6.
 */

import React,{PropTypes} from 'react';
import { preload } from 'react-isomorphic-render/redux'
import styler      from 'react-styling'

import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUsers,addUsers,deleteUsers} from '../actions/users.js'

@preload(({dispatch,getState})=>dispatch(getUsers()))
@connect(
    (store)=> ({
        users: store.users.users
    }), (dispatch)=> {
        bindActionCreators({getUsers, addUsers, deleteUsers}, dispatch)
    }
) class users extends React.Component {

    static propTypes =
    {
        getUsers: PropTypes.func.isRequired,
        addUsers: PropTypes.func.isRequired,
        deleteUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }

    static contextTypes =
    {
        store: PropTypes.object.isRequired
    }


    constructor(props) {
        super(props);
        this.state = {};

        this.refresh = this.refresh.bind(this);
        this.add_user = this.add_user.bind(this);
        this.delete_user = this.delete_user.bind(this);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {
        const {users}=this.props;

        const markup = (
            <section>
                <div>
                    <p>This is an example of REST API usage with no database persistence</p>

                    {this.render_users(users.error, users.loaded, users.users)}
                </div>

            </section>

        )
        return markup;

    }

    render_users(error, loaded, users) {
        if (error) {

            const markup = (<div style={style.users}>
                {'Failed to load the list of users'}

                <button onClick={this.refresh} style={style.users.refresh}></button>
            </div>)

            return markup;
        }

        if (!loaded) {
            const markup = (
                <div style={style.users}>
                    {'loading users data'}
                </div>
            )
        }

        if (users.length == 0) {
            const markup = (
                <div style={style.users}>
                    No users
                    <button onClick={this.add_user} style={style.users.add}>Add user</button>
                    <button onClick={this.refresh} style={style.users.refresh}>Refresh</button>
                </div>
            )
        }

        const markup = (
            <div style={style.users}>
                <span style={style.users.list.title}>users</span>

                <button onClick={this.add_user} style={style.users.add}>Add user</button>
                <button onClick={this.refresh} style={style.users.refresh}>Refresh</button>

                <div>
                    <ul style={style.users.list}>
                        {users.map((user)=> {
                            return (
                                <li key={user.id}>
                                    <span>{user.id}</span>
                                    <span>{user.name}</span>
                                    <button onClick={()=>this.delete_user(user.id)} style={style.users.refresh}>delete
                                    </button>
                                </li>
                            )

                        })}
                    </ul>

                </div>

            </div>

        )

    }


    refresh() {
        this.props.getUsers();
    }

    add_user() {

        const name = prompt('enter name!')

        if (!name) {
            return
        }

        this.props.addUsers({name: name})

    }

    delete_user(id) {
        this.props.deleteUsers(id)

    }

}


const style = styler
    `
	container

	users
		margin-top : 2em

		list
			display         : inline-block
			list-style-type : none
			padding-left    : 1em

			title
				font-weight : bold

		refresh
			margin-left : 1em

		add
			margin-left : 1em

		delete
			margin-left : 1em

	user
		id
			color        : #9f9f9f

		name
			margin-left : 0.3em
`


export default users;