import React from 'react';
import { renderRoutes } from "react-router-config";
import { Link } from 'react-router-dom';
import './index.css';


function Demo(props) {

  const { route } = props;

  return (
    <div className="Demo">
      <div className="DemoTab">
        <Link to="/demo/UseMemoDemo" className="selected">
          <div className="DemoTab-item"><span>1: UseMemo与useCallback相关</span></div>
        </Link>
      </div>
      { renderRoutes(route.routes) }
    </div>
  )
}

export default React.memo(Demo);