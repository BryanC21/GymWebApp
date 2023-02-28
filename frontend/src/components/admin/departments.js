import React, { Fragment } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { XCircle } from 'react-bootstrap-icons';

class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { departments: [] };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + "/api/user/getDepartments")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then(data => {
                fetch(api + "/api/user/getDepartmentsManagers")
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            alert(response.statusText);
                        }
                    })
                    .then(data2 => {
                        var managers = {}
                        data2.results.forEach(manager => {
                            if (manager.title === "Manager") {
                                managers[manager.dept_no] = manager.emp_no;
                            }
                        })
                        console.log(managers);
                        this.setState({ departments: data.results, managers: managers, managers_original: managers });
                    });
            });
    }

    handleAddFields() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/addDepartment?";
        var department = { dept_name: "Default Name" };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.departments];
                department.dept_no = data.id;
                values.push(department);
                this.setState({ departments: values });
            });
    };

    handleRemoveFields(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/deleteDepartment?";
        var department = { id: this.state.departments[index].dept_no };

        fetch(api + api_name + new URLSearchParams(department))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert(response.statusText);
                }
            })
            .then((data) => {
                const values = [...this.state.departments];
                values.splice(index, 1);
                this.setState({ departments: values });
            });
    };

    handleInputChange(index, value) {
        const values = [...this.state.departments];
        values[index].dept_name = value;
        this.setState({ departments: values });
    };

    handleManagerChange(index, value) {
        const dept_no = this.state.departments[index].dept_no;
        const values = { ...this.state.managers };
        values[dept_no] = value;
        this.setState({ managers: values });
    };

    async handleSave(index) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var api_name = "/api/admin/editDepartment?";
        const dept_no = this.state.departments[index].dept_no;
        const dept_name = this.state.departments[index].dept_name;
        var department = { dept_no: dept_no, dept_name: dept_name };
        const emp_id = this.state.managers[dept_no];
        const emp_id_original = this.state.managers_original[dept_no];
        var msg = "";

        const deptResponse = await fetch(api + api_name + new URLSearchParams(department))
        if (deptResponse.status === 200) {
            msg += "Department Changes Saved\n";
        } else {
            msg = deptResponse.statusText + "\n";
        }

        if (emp_id_original !== emp_id && !(!this.state.managers_original[dept_no] && emp_id === "")) {
            var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
            if (this.state.managers_original[dept_no]) {
                var api_name = "/api/admin/removeDeptManager?";
                const rmManResponse = await fetch(api + api_name + new URLSearchParams({
                    emp_id: emp_id_original,
                    dept_no: dept_no,
                }))
                if (rmManResponse.status === 200) {
                    msg += "Original Manager Removed\n";
                } else {
                    msg += rmManResponse.statusText + "\n";
                }
            }
            var api_name = "/api/admin/addDeptManager?";
            const addManResponse = await fetch(api + api_name + new URLSearchParams({
                emp_id: emp_id,
                dept_no: dept_no,
            }))
            if (addManResponse.status === 200) {
                var api_name = "/api/admin/addEmpTitle?";
                const addManTitleResponse = await fetch(api + api_name + new URLSearchParams({
                    id: emp_id,
                    title: "Manager",
                }))
                if (addManTitleResponse.status === 200) {
                    const values = { ...this.state.managers_original };
                    values[dept_no] = emp_id;
                    await this.setState({ managers_original: values });
                    msg += "New Manager Added";
                } else {
                    msg += addManTitleResponse.statusText + "\n";
                }
            } else {
                msg += addManResponse.statusText + "\n";
            }
        }
        alert(msg);
    }

    render() {
        return (
            <>
                <h1>Departments</h1>
                <Row className="mb-2">
                    {this.state.departments && this.state.departments.length ? this.state.departments.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Col xs="12" lg="4">
                                <Card className="mb-2 p-3 items-body">
                                    <Card.Title>{this.state.departments.name}</Card.Title>
                                    <Form.Label htmlFor="option">
                                        Department {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
                                    </Form.Label>
                                    <Row>
                                        <Col lg="9">
                                            <Form.Control
                                                type="text"
                                                id={item.dept_no}
                                                value={item.dept_name}
                                                onChange={e => this.handleInputChange(index, e.target.value)}
                                            /><br />
                                            <Form.Label>Manager id</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={this.state.managers[item.dept_no]}
                                                onChange={e => this.handleManagerChange(index, e.target.value)}
                                            />
                                        </Col>
                                        <Col className="d-flex align-items-center">
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

export default Departments;
