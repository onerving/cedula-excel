import React, {Component} from 'react';
import {Card, Container, Grid, Header, Input, Search, Segment} from "semantic-ui-react";
import {getLicenseInfo} from "./CedulaFinder";

class CedulaSearch extends Component {
    state = {
        query: '1629426',
        result: {}
    };

    componentDidMount() {
        this.searchAndSetResults(this.state.query);
    }

    searchAndSetResults = (query) =>{
        getLicenseInfo(query).then( info => {
                console.log(info);
                this.setState({result: info});
            }
        );
    };

    handleChange = (event) =>{
        const query = event.target.value;
        this.setState({query});
        this.searchAndSetResults(query);
    };


    render() {
        return (
            <Grid.Column computer={5} tablet={8} mobile={16} verticalAlign={'middle'}>
                <Header>Buscador de cédulas profesionales</Header>
                <Segment>
                    <Grid.Row>
                        <Input type={'number'} value={this.state.query} onChange={this.handleChange}/>
                    </Grid.Row>
                    <Grid.Row noGutters>
                        <SearchResults result={this.state.result}/>
                    </Grid.Row>
                </Segment>
            </Grid.Column>
        );
    }
}

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: this.props.result,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({result: nextProps.result});
    }


    render() {
        if(this.state.result && this.state.result.nombre !== undefined){
            const { anioRegistro, genero, id, institucion, materno, nombre, numCedula, paterno, timestamp, tipo, titulo
            } = this.state.result;
            return (
                <Card centered className={'results'}>
                    <Card.Content>
                        <Card.Header>{numCedula}</Card.Header>
                        <Card.Meta>Cédula profesional </Card.Meta>
                    </Card.Content>
                    <Card.Content>
                        <Card.Description>
                            <p>{`${paterno} ${materno} ${nombre}`}</p>
                            <p>{titulo}</p>
                            <p>{institucion}</p>
                            <p>{anioRegistro}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        }else{
            return (
                <Container className={'results'}>
                    <Header as={'h3'}>Sin resultados</Header>
                </Container>
            );

        }
    }
}

export default CedulaSearch;