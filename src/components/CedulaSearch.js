import React, {Component} from 'react';
import {getLicenseInfo} from "./CedulaFinder";
import BasicDropzone from "./BasicDropzone";
import {Card, CardBody, Col, Container, Form, Jumbotron, Row, CardTitle, FormGroup, Input, Button} from 'reactstrap';
import XLSX from 'xlsx';
import Label from "reactstrap/es/Label";

class CedulaSearch extends Component {
    state = {
        query: '1629426',
        result: {},
        file: null,
        columns: [],
    };

    componentDidMount() {
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


    firstStepCompleted = (files) =>{
        const f = files[0];
        const reader = new FileReader();
        const scope = this;
        reader.onload = function(event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let jsonWorksheet = XLSX.utils.sheet_to_json(worksheet, {header: 'A'});
            console.log(jsonWorksheet);
            scope.setState({columns: Object.entries(jsonWorksheet[0]), worksheet: jsonWorksheet});
        };
        reader.readAsArrayBuffer(f);
    };

    handleInputChange = (e) => {
        let {name, value} = e.target;
        console.log(name + ' ' + value);
        this.setState({
            [name] : value
        })
    };

    render() {
        return (
            <Container>
                <h3>Verificador de cédulas profesionales</h3>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h4>Paso 1: Sube tu archivo de Excel</h4>
                        </CardTitle>
                        <BasicDropzone
                            onDropAccepted={this.firstStepCompleted}
                        />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h4>Paso 2: configura de acuerdo a tu documento</h4>
                        </CardTitle>
                        <Form>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                        <Label className={'mr-sm-2'}>Columna donde están las cédulas: </Label>
                                        <Input
                                            name={'licenseCol'}
                                            onChange={this.handleInputChange}
                                            type={'select'}
                                        >
                                            <option disabled selected value> Selecciona una columna </option>
                                            {this.state.columns.map((col) => (
                                                <option
                                                    key={col[0]}
                                                    value={col[0]}
                                                >{col[0]} - {col[1]} </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                        <Label className={'mr-sm-2'}>Columna de verificación: </Label>
                                        <Input
                                            name={'validationCol'}
                                            onChange={this.handleInputChange}
                                            type={'select'}
                                        >
                                            <option disabled selected value> Selecciona una columna </option>
                                            {this.state.columns.map((col) => (
                                                <option
                                                    key={col[0]}
                                                    value={col[0]}
                                                >{col[0]} - {col[1]} </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                        <Label className={'mr-sm-2'}>Poner en la fila de una cédula verificada:</Label>
                                        <Input
                                            placeholder={'Válida, 1, o, etc.'}
                                            type={'text'}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                        <Label className={'mr-sm-2'}>Poner en la fila de una cédula rechazada:</Label>
                                        <Input
                                            placeholder={'Inválida, 0, x, etc.'}
                                            type={'text'}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col>
                                    <Button type={'submit'}>Verificar cédulas</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}


export default CedulaSearch;