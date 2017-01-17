/**
 * Created by liujinhe on 17/1/5.
 */

import React from 'react';
import {Link} from 'react-router';
import style from '../assets/styles/home.scss'

class home extends React.Component {
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

        const husky=require('../assets/images/husky.jpg');

        let markup=(
            <section>
                <h1 className={style.header} >
                    Husky
                </h1>
                <img src={husky} className={style.image}/>

            </section>

        )
        return markup;
    }
}

export default home;