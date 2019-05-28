import React from 'react';
import './App.css';
import CedulaSearch from "./components/CedulaSearch";
import {Container} from "reactstrap";


function App() {
    return (
        <Container fluid className={'App d-flex justify-items-center align-items-center'}>
            <CedulaSearch />
        </Container>
    );
}

export default App;
