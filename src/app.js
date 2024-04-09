
import React, { lazy, Suspense, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "@/style/global.less";
import routeConfig from "@/route/index";

const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {routeConfig.map((item) => {
                            return <Route path={item.path} key={item.path} element={<item.component />} />
                        })}
                        <Route path="*" element={<div>空页面</div>} />
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
