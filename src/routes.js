import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Feedbacks from './views/client/feedbacks';
import FeedbacksCreate from './views/client/feedbacks/feedbacks.create';
import FeedbacksEdit from './views/client/feedbacks/feedbacks.edit';
import FeedbacksShow from './views/client/feedbacks/feedbacks.show';

import Login from './views/auth/singin';
import Dashboard from './views/client/dashboard';
import PrivateRoute from './components/privateRoute';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/login" exact component={Login} />

        <PrivateRoute path="/dashboard" exact component={Dashboard} />

        <PrivateRoute path="/feedbacks" exact component={Feedbacks} />

        <PrivateRoute path="/feedbacks/create" exact component={FeedbacksCreate} />
        <PrivateRoute path="/feedbacks/:idFeedback/edit" exact component={FeedbacksEdit} />
        <PrivateRoute path="/feedbacks/:idFeedback" exact component={FeedbacksShow} />
      </Switch>
    </BrowserRouter>
  );
}