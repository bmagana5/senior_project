import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorMessageProvider } from './contexts/error-message.context';
import { UserProvider } from './contexts/user.context';
import { FriendsProvider } from './contexts/friends.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorMessageProvider>
        <UserProvider>
            <FriendsProvider>
                <App />
            </FriendsProvider>
        </UserProvider>
    </ErrorMessageProvider>
);


