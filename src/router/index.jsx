import * as React from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Redirect,
  Switch,
  HashRouter,
} from "react-router-dom";
import { history, generateBrowserHistory } from "utils/history";
console.log(React);

import "app/mountAppApis";
import Pageindex from "pages/index/index";
import Pagegraph from "pages/graph/index";
// import Pageuser from "pages/user/index";
// import PagegraphDetail from "pages/graphDetail/index";
// import Pageabout from "pages/about/index";
// import PageexpertDetail from "pages/expertDetail/index";
// import Pageclassification from "pages/classification/index";
// import Pageinvacations from "pages/invacations/index";
// import Pagefavorites from "pages/favorites/index";
// import Pagecategory from "pages/category/index";

export default () => {
  // 显式声明HASH 或 app 的 路由使用 hash router，而其他web应用使用 BrowserRouter
  if (process.env.isApp || process.env.historyType === "HASH") {
    return (
      <Router history={history}>
        <Switch>
          <Redirect from="/" exact to="/index" />
          <Route path="/index" component={Pageindex} />
          <Route path="/graph" component={Pagegraph} />
          {/* <Route path="/user" component={Pageuser}/>
<Route path="/graphDetail" component={PagegraphDetail}/>
<Route path="/about" component={Pageabout}/>
<Route path="/expertDetail" component={PageexpertDetail}/>
<Route path="/classification" component={Pageclassification}/>
<Route path="/invacations" component={Pageinvacations}/>
<Route path="/favorites" component={Pagefavorites}/>
<Route path="/category" component={Pagecategory}/> */}
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router
        history={generateBrowserHistory({ basename: "/app-qb9lbymv/preview/" })}
      >
        <Switch>
          <Redirect from="/" exact to="/index" />
          <Route path="/index" component={Pageindex} />
          <Route path="/graph" component={Pagegraph} />
          <Route path="/user" component={Pageuser} />
          <Route path="/graphDetail" component={PagegraphDetail} />
          <Route path="/about" component={Pageabout} />
          <Route path="/expertDetail" component={PageexpertDetail} />
          <Route path="/classification" component={Pageclassification} />
          <Route path="/invacations" component={Pageinvacations} />
          <Route path="/favorites" component={Pagefavorites} />
          <Route path="/category" component={Pagecategory} />
        </Switch>
      </Router>
    );
  }
};
