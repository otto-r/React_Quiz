import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { RenderQuestionAdd } from './components/RenderQuestionAdd';
import { RenderEditQuestion } from './components/RenderEditQuestion';


export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/addquestion' component={RenderQuestionAdd} />
    <Route path='/editquestion' component={RenderEditQuestion} />
</Layout>;
