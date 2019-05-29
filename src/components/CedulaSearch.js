import React, {Component} from 'react';
import {getLicenseInfo} from "./CedulaFinder";
import BasicDropzone from "./BasicDropzone";
import {Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Row, Spinner} from 'reactstrap';
import XLSX from 'xlsx';
import Label from "reactstrap/es/Label";

class CedulaSearch extends Component {
    state = {
        query: '1629426',
        result: {},
        columns: [],
        worksheet: null,
        validationState: false,
    };

    handleInputChange = (e) => {
        let {name, value} = e.target;
        this.setState({
            [name] : value
        })
    };

    excelUploaded = (files) =>{
        const f = files[0];
        const reader = new FileReader();
        const scope = this;
        reader.onload = function(event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // Obtenemos un arreglo del excel, con jsons de cada fila.
            // La opción A nos da un json del tipo {<columna>: <contenido>, B: 'algo'}
            let jsonWorksheet = XLSX.utils.sheet_to_json(worksheet, {header: 'A'});
            // Guardamos la hoja de trabajo y sus nombres de columnas en el estado

            const columns = Object.entries(jsonWorksheet[0]);
            const lastColumn = columns.slice(-1)[0][0];
            const nextLetter = String.fromCharCode(lastColumn.charCodeAt(0) + 1);
            scope.setState({workbook: workbook, columns: columns, worksheet: jsonWorksheet, newColumnLetter: nextLetter});
        };
        reader.readAsArrayBuffer(f);
    };

    validateLicenses = (event) => {
        event.preventDefault();
        this.setState({validationState: true});
        const {worksheet, licenseCol, validationCol, validMark, invalidMark} = this.state;
        const results = worksheet.map(async (item, index) => {
            if (index === 0) return item;
            const license = item[licenseCol];
            const info =  await getLicenseInfo(license);
            item[validationCol] = (info && license === parseInt(info['numCedula'])) ? validMark : invalidMark;
            return item;
        });
        Promise.all(results).then(completed =>{
            const sheet = XLSX.utils.json_to_sheet(completed, {skipHeader:true});
            const workbook = this.state.workbook;
            XLSX.utils.book_append_sheet(workbook, sheet, "cédulas validadas");
            XLSX.writeFile(workbook, 'editado.xlsx');
            this.setState({validationState: false});
            }
        );
    };

    render() {
        const {licenseCol, validationCol, validMark, invalidMark} = this.state;
        const requirements = (licenseCol && validationCol && validMark && invalidMark);
        const button = <Button
            color={'primary'}
            type={'submit'}
            disabled={!requirements}
            onClick={this.validateLicenses}
        >Verificar cédulas</Button>;
        const spinner = <React.Fragment>
            <Spinner type={'grow'} color={'primary'}/>
            <p>Verificando. Esto puede tardar unos segundos.</p>
        </React.Fragment>;
        const submitArea =  (!this.state.validationState) ? button
            :
            spinner;
        const secondStepCard = (!this.state.worksheet) ? null :
            <Card>
                <CardBody>
                    <CardTitle>
                        <h4>Paso 2: Configura de acuerdo a tu documento</h4>
                    </CardTitle>
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <ColSelectInput
                                    columns={this.state.columns}
                                    name={'licenseCol'}
                                    onChange={this.handleInputChange}
                                    title={'Columna donde están las cédulas'}
                                />
                            </Col>
                            <Col md={6}>
                                <ColSelectInput
                                    columns={this.state.columns}
                                    name={'validationCol'}
                                    onChange={this.handleInputChange}
                                    title={'Columna donde se marcará la verificación'}
                                    newColumnLetter={this.state.newColumnLetter}
                                />
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                    <Label className={'mr-sm-2'}>Poner en la fila de una cédula verificada:</Label>
                                    <Input
                                        name={'validMark'}
                                        onChange={this.handleInputChange}
                                        placeholder={'Válida, 1, o, etc.'}
                                        type={'text'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
                                    <Label className={'mr-sm-2'}>Poner en la fila de una cédula rechazada:</Label>
                                    <Input
                                        name={'invalidMark'}
                                        onChange={this.handleInputChange}
                                        placeholder={'Inválida, 0, x, etc.'}
                                        type={'text'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {submitArea}
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>;

        return (
            <Container>
                <h3>Verificador de cédulas profesionales</h3>
                <FirstStepCard onExcelUploaded={this.excelUploaded}/>
                {secondStepCard}
            </Container>
        );
    }
}

function FirstStepCard (props) {
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h4>Paso 1: Sube tu archivo de Excel</h4>
                </CardTitle>
                <BasicDropzone
                    onDropAccepted={props.onExcelUploaded}
                />
            </CardBody>
        </Card>
    );
}

function ColSelectInput(props){
    const newColumnOption = (!props.newColumnLetter) ? null :
        <option
            key={props.newColumnLetter}
            value={props.newColumnLetter}
        >{props.newColumnLetter} - (nueva columna) </option>;
    return(
        <FormGroup className={'mb-2 mr-sm-2 mb-sm-0'}>
            <Label className={'mr-sm-2'}>{props.title}</Label>
            <Input
                name={props.name}
                onChange={props.onChange}
                type={'select'}
                defaultValue={0}
            >
                <option disabled value={0}> Selecciona una columna </option>
                {props.columns.map((col) => (
                    <option
                        key={col[0]}
                        value={col[0]}
                    >{col[0]} - {col[1]} </option>
                ))}
                {newColumnOption}
            </Input>
        </FormGroup>
    );
}


export default CedulaSearch;