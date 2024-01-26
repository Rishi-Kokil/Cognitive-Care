
import React from 'react';
import { AuthComponent } from './authContext';

function ContextWrapper({ children }) {
    return (
        <AuthComponent>
            {children}
        </AuthComponent>

    );
}

export default ContextWrapper;