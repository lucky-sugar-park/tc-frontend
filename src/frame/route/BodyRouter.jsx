import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { loadRoutes } from './RouterLoader';
import BodyRouterWrapper from './BodyRouteWrapper';

const BodyRouter = (props) => {

    const [presenterMap, setPresenertMap] = React.useState([]);

    React.useEffect(()=>{
        setPresenertMap (loadRoutes(props));
    }, [props]);

    return (
        // TO-DO: div style의 theme 반영 필요
        <div style={{ height: '100%', width: '100%' }}>
            <Routes>
                {
                    presenterMap.map((route, index)=>{
                        return (
                            <Route
                                key={ index }
                                path={ route.key }
                                element={
                                    <BodyRouterWrapper 
                                        path={ route.key }
                                        presenter={ route.presenter }
                                        layout={ route.layout }
                                        { ...props }
                                    />
                                }
                                { ...props }
                            />
                        )
                    })
                }
            </Routes>
        </div>
    )
}

export default BodyRouter;
