import browserHistory from "react-router/lib/browserHistory";

import Layout from "./components/layout";

if(typeof System === "undefined") {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}
const history = browserHistory;
const handleError = (error) => {
  throw new Error(`Dynamic page loading failed: ${error}`);
};
const loadModule = (cb) => module => cb(null, module.default);

const getRoutes = () => ({
  path: "/",
  component: Layout,
  childRoutes: [
    {
      path: "login",
      getComponent (location, cb) {
        System.import("./components/login/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "social/success/:token",
      getComponent (location, cb) {
        System.import("./components/login/social-login-success")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "signup",
      getComponent (location, cb) {
        System.import("./components/signup/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "landing",
      getComponent (location, cb) {
        System.import("./components/landing/container")
          .then(response => {
            loadModule(cb)(response);
          })
          .catch(handleError);
      }
    },
    {
      path: "add-entry",
      getComponent (location, cb) {
        System.import("./components/expense-entry/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "edit-entry/:expenseId",
      getComponent (location, cb) {
        System.import("./components/expense-entry/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "reports",
      getComponent (location, cb) {
        System.import("./components/reports/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "settings(/:token)",
      getComponent (location, cb) {
        System.import("./components/settings/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    },
    {
      path: "manage-categories",
      getComponent (location, cb) {
        System.import("./components/manage-categories/container")
          .then(loadModule(cb))
          .catch(handleError);
      }
    }
  ],
});


export {getRoutes, history};
