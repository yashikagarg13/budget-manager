import React, {PropTypes} from "react";

const Layout = (props) => (
  <div>
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
