import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Quiz } from './Quiz';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <Quiz/>
        </div>;
    }
}

