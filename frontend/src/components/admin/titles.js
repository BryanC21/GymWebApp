import React, { Fragment } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { XCircle } from 'react-bootstrap-icons';

class Titles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { titles: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + "/api/user/getTitles")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then(data => {
                this.setState({ titles: data.results });
            });
    }

    handleAddFields() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/addDepartment?";
        var department = { id: Math.floor(Math.random() * 100), dept_name: "Default Name" };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.titles];
                department.dept_no = department.id;
                values.push(department);
                this.setState({ titles: values });
            });
    };

    handleRemoveFields(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/deleteDepartment?";
        var department = { id: this.state.titles[index].dept_no };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.titles];
                values.splice(index, 1);
                this.setState({ titles: values });
            });
    };

    handleInputChange(index, value) {
        const values = [...this.state.titles];
        values[index].dept_name = value;
        this.setState({ titles: values });
    };

    handleSave(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/editDepartment?";
        var department = { dept_no: this.state.titles[index].dept_no, dept_name: this.state.titles[index].dept_name };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
    }

    render() {
        return (
            <>
                <h1>Titles</h1>
                <Row className="mb-2">
                    {this.state.titles && this.state.titles.length ? this.state.titles.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Col xs="12" lg="4">
                                <Card className="mb-2 p-3 items-body">
                                    <Form.Label htmlFor="option">
                                        Title {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
                                    </Form.Label>
                                    <Row>
                                        <Col lg="9">
                                            <Form.Control
                                                type="text"
                                                id={item.title}
                                                value={item.title}
                                                onChange={e => this.handleInputChange(index, e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <Button variant="primary" onClick={() => this.handleSave(index)} >Save</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Fragment>
                    ))
                        : <></>
                    }
                </Row>
                <Button variant="primary" className="mb-2" onClick={() => this.handleAddFields()} >Add Department</Button><br />
            </>
        )
    }
}

export default Titles;
