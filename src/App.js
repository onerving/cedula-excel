import React from 'react';
import './App.css';
import {Grid} from "semantic-ui-react";
import CedulaSearch from "./components/CedulaSearch";


function App() {
    return (
        <Grid centered className={'App'}>
            <CedulaSearch />
        </Grid>
    );
}

export default App;
