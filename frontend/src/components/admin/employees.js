import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import EmployeeList from '../admin/employee_list';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { ClipLoader } from 'react-spinners';

const count = 100;
const searchParams = new URLSearchParams(document.location.search);
var page = searchParams.get('page') || 1;
const col = searchParams.get('col') || "emp_no";
const order = searchParams.get('order') || "ASC";
const mode = searchParams.get('mode') || "default";
const name = searchParams.get('name') || "";
const dept_name = searchParams.get('dept_name') || "";
const title = searchParams.get('title') || "";

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: col,
            order: order,
            mode: mode,
            name: name,
            dept_name: dept_name,
            title: title,
            employees: [],
            wait: true,
        };
    }

    componentDidMount() {
        this.getData();
        this.getList(mode);
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
            .then(data2 => {
                fetch(api + "/api/user/getTitles")
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            alert(response.statusText);
                        }
                    })
                    .then(data3 => {
                        this.setState({ departments: data2.results, titles: data3.results });
                    });
            });
    }
    getList(mode) {
        if (this.state.title !== "" && this.state.dept_name === "") {
            alert("Please select department when searching with title");
        } else {
            var current = "yes";
            var api_name = "/api/admin/getEmployeesCurrentSorted?";
            if (mode === "search") {
                api_name = "/api/search/searchEverything?";
            } else if (mode === "searchall") {
                api_name = "/api/admin/getEmployeesCurrentSorted?";
                current = "no";
            } else if (mode === "managers") {
                api_name = "/api/user/getDepartmentsManagers?";
            }

            const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
            fetch(api + api_name + new URLSearchParams({
                name: this.state.name,
                title: this.state.title,
                dept_name: this.state.dept_name,
                title: this.state.title,
                col: this.state.col,
                order: this.state.order,
                count: count,
                offset: (page - 1) * count,
                current: current,
            }))
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert(response.statusText);
                    }
                })
                .then((data) => {
                    this.setState({ employees: data.results, mode: "search", wait: false });
                });
        }
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDeptChange(e) {
        this.setState({ dept_name: e.target.value });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    async handleSort(col) {
        let order = "DESC";
        if (this.state.col !== col || this.state.order === "DESC") {
            order = "ASC"
        }
        await this.setState({ col: col, order: order, wait: true });
        this.getList(this.state.mode);
    }

    render() {
        const searchParams = new URLSearchParams(document.location.search);
        const page = parseInt(searchParams.get('page') || 1);
        return (
            <>
                <Container>
                    {this.state.wait
                        ?
                        <div className="text-center">
                            <ClipLoader color={"#123abc"} />
                        </div>
                        :
                        <></>
                    }
                    <Row>
                        {mode === "default" || mode === "search" ?
                            <Card className="mb-2">
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label>
                                                <Form.Select value={this.state.dept_name} onChange={(e) => this.handleDeptChange(e)}>
                                                    <option value=""></option>
                                                    {this.state.departments && this.state.departments.length ? this.state.departments.map((department, index) => (
                                                        <Fragment key={`${department}~${index}`}>
                                                            <option value={department.dept_name}>{department.dept_name}</option>
                                                        </Fragment>
                                                    ))
                                                        :
                                                        <></>
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Select value={this.state.title} onChange={(e) => this.handleTitleChange(e)}>
                                                    <option value=""></option>
                                                    {this.state.titles && this.state.titles.length ? this.state.titles.map((title, index) => (
                                                        <Fragment key={`${title}~${index}`}>
                                                            <option value={title.title}>{title.title}</option>
                                                        </Fragment>
                                                    ))
                                                        :
                                                        <></>
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <a href={"/employees?" + new URLSearchParams({
                                                page: 1,
                                                name: this.state.name,
                                                title: this.state.title,
                                                dept_name: this.state.dept_name,
                                                title: this.state.title,
                                                mode: "search",
                                                col: this.state.col,
                                                order: this.state.order,
                                            })} className="my-4 btn btn-primary">
                                                Search
                                            </a>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            :
                            <></>
                        }

                        <Card className="mb-2 items-body">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        #
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("emp_no")}>
                                            {mode !== "managers"
                                                ?
                                                this.state.col === "emp_no" && this.state.order === "ASC"
                                                    ?
                                                    <CaretUpFill />
                                                    :
                                                    <CaretDownFill />
                                                :
                                                <></>
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        First Name
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("first_name")}>
                                            {mode !== "managers"
                                                ?
                                                this.state.col === "first_name" && this.state.order === "ASC"
                                                    ?
                                                    <CaretUpFill />
                                                    :
                                                    <CaretDownFill />
                                                :
                                                <></>
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        Last Name
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("last_name")}>
                                            {mode !== "managers"
                                                ?
                                                this.state.col === "last_name" && this.state.order === "ASC"
                                                    ?
                                                    <CaretUpFill />
                                                    :
                                                    <CaretDownFill />
                                                :
                                                <></>
                                            }
                                        </a>
                                    </Col>
                                    <Col>
                                        Department
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("dept_name")}>
                                            {mode !== "managers"
                                                ?
                                                this.state.col === "dept_name" && this.state.order === "ASC"
                                                    ?
                                                    <CaretUpFill />
                                                    :
                                                    <CaretDownFill />
                                                :
                                                <></>
                                            }
                                        </a>
                                    </Col>
                                    <Col>Title
                                        <a href="#" className="ms-1 text-dark" onClick={() => this.handleSort("title")}>
                                            {mode !== "managers"
                                                ?
                                                this.state.col === "title" && this.state.order === "ASC"
                                                    ?
                                                    <CaretUpFill />
                                                    :
                                                    <CaretDownFill />
                                                :
                                                <></>
                                            }
                                        </a>
                                    </Col>
                                    <Col>Action</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    <EmployeeList employees={this.state.employees} />
                </Container>
                {mode !== "managers"
                    ?
                    <div className="d-flex">
                        <span className="me-auto">
                            {page > 1 ?
                                <>
                                    <a className="btn btn-primary me-1" href={window.location.pathname + "?" + new URLSearchParams({
                                        page: 1,
                                        name: this.state.name,
                                        title: this.state.title,
                                        dept_name: this.state.dept_name,
                                        title: this.state.title,
                                        mode: this.state.mode,
                                        col: this.state.col,
                                        order: this.state.order,
                                    })}>{"<<First"}</a>
                                    {page > 10 ?
                                        <a className="btn btn-primary me-1" href={window.location.pathname + "?" + new URLSearchParams({
                                            page: page - 10,
                                            name: this.state.name,
                                            title: this.state.title,
                                            dept_name: this.state.dept_name,
                                            title: this.state.title,
                                            mode: this.state.mode,
                                            col: this.state.col,
                                            order: this.state.order,
                                        })}>{"<Prev 10"}</a>
                                        :
                                        <></>
                                    }
                                    <a className="btn btn-primary me-1" href={window.location.pathname + "?" + new URLSearchParams({
                                        page: page - 1,
                                        name: this.state.name,
                                        title: this.state.title,
                                        dept_name: this.state.dept_name,
                                        title: this.state.title,
                                        mode: this.state.mode,
                                        col: this.state.col,
                                        order: this.state.order,
                                    })}>{"<Prev"}</a>
                                </>
                                :
                                <></>
                            }

                        </span>
                        <span>
                            <a className="btn btn-primary me-1" href={window.location.pathname + "?" + new URLSearchParams({
                                page: page + 1,
                                name: this.state.name,
                                title: this.state.title,
                                dept_name: this.state.dept_name,
                                title: this.state.title,
                                mode: this.state.mode,
                                col: this.state.col,
                                order: this.state.order,
                            })}>{"Next>"}</a>
                            <a className="btn btn-primary me-1" href={window.location.pathname + "?" + new URLSearchParams({
                                page: page + 10,
                                name: this.state.name,
                                title: this.state.title,
                                dept_name: this.state.dept_name,
                                title: this.state.title,
                                mode: this.state.mode,
                                col: this.state.col,
                                order: this.state.order,
                            })}>{"Next 10>>"}</a>
                        </span>
                    </div>
                    :
                    <></>
                }
            </>
        );
    }
}

export default AdminMain;
