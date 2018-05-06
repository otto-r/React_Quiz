import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { HighScore } from './components/HighScore';
import { RenderQuestionAdd } from './components/RenderQuestionAdd';
import { RenderEditQuestion } from './components/RenderEditQuestion';
import { RenderDeleteQuestion } from './components/RenderDeleteQuestion';



export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/highscore' component={ HighScore } />
    <Route path='/addquestion' component={RenderQuestionAdd} />
    <Route path='/editquestion' component={RenderEditQuestion} />
    <Route path='/deletequestion' component={RenderDeleteQuestion} />
</Layout>;
