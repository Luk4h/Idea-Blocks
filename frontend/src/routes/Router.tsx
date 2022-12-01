import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { ProtectedRouter } from './ProtectedRouter';
import { UnprotectedRouter } from './UnprotectedRouter'

const BrowserRoutes: React.FC = () => 
{
    return (
        <Router>
            {
                useAuth().logged ?
        <ProtectedRouter /> : 
        <UnprotectedRouter/>
            }
        
    </Router>
    )
}
      

export { BrowserRoutes };
