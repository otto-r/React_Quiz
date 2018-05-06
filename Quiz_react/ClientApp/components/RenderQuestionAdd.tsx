import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AddQuestion } from './AddQuestion';

export class RenderQuestionAdd extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <AddQuestion />
        </div>;
    }
}
