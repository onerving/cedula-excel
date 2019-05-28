import React, {Component} from 'react';
import {Card, Container, Header} from "semantic-ui-react";

export default class SearchResults extends Component {
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
