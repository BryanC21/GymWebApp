import React, { Component, Fragment } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmpty } from '../utils';

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            first_name: "",
            last_name: "",
            gender: 'M',
            dept_no: "",
            title: "",
            salary: 0,
            result: {},
            loading: true,
        }
    }
    componentDidMount() {
        if (this.props.mode === "edit") {
            this.getDetails();
        }
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

                        this.setState({ departments: data2.results, titles: data3.results, loading: false });
                    });
            });
    }
    getDetails() {
        const searchParams = new URLSearchParams(document.location.search);
        const emp_no = searchParams.get('emp_no');
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        if (emp_no !== null) {
            fetch(api + "/api/admin/getByID?" + new URLSearchParams({
                id: emp_no,
            }))
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert(response.statusText);
                    }
                })
                .then((data) => {
                    this.setState({
                        result: data.results,
                        id: data.results.userData.emp_no,
                        first_name: data.results.userData.first_name,
                        last_name: data.results.userData.last_name,
                        gender: data.results.userData.gender,
                        birth_date: data.results.userData.birth_date.split('T')[0],
                        hire_date: data.results.userData.hire_date.split('T')[0],
                        dept_no: data.results.deptData[0].dept_no,
                        title: data.results.titleData[0].title,
                        dept_original: data.results.deptData[0].dept_no,
                        title_original: data.results.titleData[0].title,
                        salary_original: data.results.salaryData[0].salary,
                        salary: data.results.salaryData[0].salary,
                    });
                });
        }
    }
    handleFirstNameChange(e) {
        this.setState({ first_name: e.target.value });
    }
    handleLastNameChange(e) {
        this.setState({ last_name: e.target.value });
    }
    handleGenderChange(e) {
        this.setState({ gender: e.target.value });
    }
    handleBirthDateChange(e) {
        this.setState({ birth_date: e.target.value });
    }
    handleHireDateChange(e) {
        this.setState({ hire_date: e.target.value });
    }
    handleDeptChange(e) {
        this.setState({ dept_no: e.target.value });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    handleSalaryChange(e) {
        this.setState({ salary: e.target.value });
    }
    async handleManage() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        var api_path = "/api/admin/editById?";
        var user = {
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            gender: this.state.gender,
            birth_date: this.state.birth_date,
            hire_date: this.state.hire_date,
        };
        if (this.props.operation === "edit") {
            api_path = "/api/admin/editById?";
        }
        const response = await fetch(api + api_path + new URLSearchParams(user));
        if (response.status === 200) {
            if (this.state.dept_no !== this.state.dept_original) {
                const rmDeptResponse = await fetch(api + "/api/admin/removeEmpDept?" + new URLSearchParams({
                    id: this.state.id,
                    dept_no: this.state.dept_original,
                }));
                if (rmDeptResponse.status === 200) {
                    var addDeptResponse = await fetch(api + "/api/admin/addEmpDept?" + new URLSearchParams({
                        id: this.state.id,
                        dept_no: this.state.dept_no,
                    }));
                    if (addDeptResponse.status === 200) {
                    } else {
                        alert(addDeptResponse.statusText);
                    }
                } else {
                    alert(rmDeptResponse.statusText);
                }
            }
            if (this.state.title !== this.state.title_original) {
                var rmTitleResponse = await fetch(api + "/api/admin/removeEmpTitle?" + new URLSearchParams({
                    id: this.state.id,
                    title: this.state.title_original,
                }));
                if (rmTitleResponse.status === 200) {
                    var addTitleResponse = await fetch(api + "/api/admin/addEmpTitle?" + new URLSearchParams({
                        id: this.state.id,
                        title: this.state.title,
                    }));
                    if (addTitleResponse.status === 200) {
                    } else {
                        alert(addTitleResponse.statusText);
                    }
                } else {
                    alert(rmTitleResponse.statusText);
                }
            }
            if (this.state.salary !== this.state.salary_original) {
                var salaryResponse = await fetch(api + "/api/admin/editSalary?" + new URLSearchParams({
                    id: this.state.id,
                    salary: this.state.salary,
                }));
                if (salaryResponse.status === 200) {
                } else {
                    alert(salaryResponse.statusText);
                }
            }
        } else {
            alert(response.statusText);
        }
        window.location.pathname = window.location.pathname.replace('edituser', 'user');
    }

    render() {
        if (this.state.loading) {
            return (<></>);
        }
        return (
            <Container>
                <h3>Manage Employee Details</h3>
                <Card>
                    {/*<Card.Img variant="top" src="https://randomuser.me/api/portraits/men/52.jpg" />*/}
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={this.state.first_name} onChange={e => this.handleFirstNameChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={this.state.last_name} onChange={e => this.handleLastNameChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={this.state.gender} onChange={(e) => this.handleGenderChange(e)}>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" value={this.state.birth_date} onChange={e => this.handleBirthDateChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hire Date</Form.Label>
                            <Form.Control type="date" value={this.state.hire_date} onChange={e => this.handleHireDateChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select value={this.state.dept_no} onChange={(e) => this.handleDeptChange(e)}>
                                {this.state.departments && this.state.departments.length ? this.state.departments.map((department, index) => (
                                    <Fragment key={`${department}~${index}`}>
                                        <option value={department.dept_no}>{department.dept_name}</option>
                                    </Fragment>
                                ))
                                    :
                                    <></>
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={e => this.handleTitleChange(e)} />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" value={this.state.salary} onChange={e => this.handleSalaryChange(e)} />
                        </Form.Group>
                        <Button variant="primary" onClick={e => this.handleManage()}>Save</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(ManageUser);
