/**
 * Created by liujinhe on 17/1/5.
 */

import React from 'react';
import {Link} from 'react-router';
import Menu from '../components/menu.js'
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {

        const menu_items =
            [{
                name: 'Home',
                link: '/'
            }, {
                name: 'Users',
                link: '/users'
            }]

        return (
            <div className="content">

                <header>
                    <Menu items={menu_items}/>
                </header>

                {this.props.children}

                <footer></footer>

            </div>

        );
    }
}

export default index;