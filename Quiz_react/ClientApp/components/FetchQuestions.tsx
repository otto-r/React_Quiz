import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Component } from 'react';

export default class FetchQuestions extends Component {
    constructor(props: {} | undefined) {
        super(props);

        this.state = {
            hits: [],
        };
    }

    componentDidMount() {
        fetch('Questions/GetQuestion')
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));
    }

    //render() {
    //    const { hits } = this.state;

    //    return (
    //        <div>
    //            {hits.map(hit =>
    //                <div key={hit.objectID}>
    //                    <a href={hit.url}>{hit.title}</a>
    //                </div>
    //            )}
    //        </div>
    //    );
    //}
}
