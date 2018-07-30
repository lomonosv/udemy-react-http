import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render () {
        let newPost = null;

        if (this.state.auth) {
            newPost = <Route path="/new-post" component={ AsyncNewPost }/>;
        }
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                activeClassName="my-active"
                                activeStyle={ {
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                } }>Posts</NavLink></li>
                            <li><NavLink to={ {
                                pathname: '/new-post',
                                hash: '#submit', // just for example
                                search: '?quick-submit=true' // just for example
                            } }>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    { newPost }
                    <Route path="/posts" component={ Posts }/>
                    <Route render={ () => <h1>Not found</h1> }/>
                    {/*<Redirect from="/" to="/posts"/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;