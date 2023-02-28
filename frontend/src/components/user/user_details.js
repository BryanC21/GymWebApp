import React, { Component } from 'react';
import { Card, Form, Col, Button, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';

const searchParams = new URLSearchParams(document.location.search);
const emp_no = searchParams.get('emp_no');

const genderName = { "M": "Male", "F": "Female" }

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "emp_no": 10001,
                "birth_date": "1953-09-02T07:00:00.000Z",
                "first_name": "Georgi",
                "last_name": "Facello",
                "gender": "M",
                "hire_date": "1986-06-26T07:00:00.000Z",
                "salary": 88958,
                "title": "Senior Engineer"
            },
            result: {},
            loading: true,
        }
    }
    componentDidMount() {
        this.getDetails();
    }

    getDetails() {
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
                    this.setState({ result: data.results, loading: false });
                });
        }
    }
    render() {
        if (this.state.loading) {
            return (<></>);
        }
        var user = this.state.user;
        user = this.state.result.userData;
        user.salary = this.state.result.salaryData[0].salary;
        user.department = this.state.result.deptData[0].dept_name;
        user.title = this.state.result.titleData[0].title;
        return (
            <Container>
                <h3>Employee Details</h3>
                <Card>
                    {/*<Card.Img variant="top" src="https://randomuser.me/api/portraits/men/52.jpg" />*/}
                    <Card.Body>
                        <Card.Title> <span className='text-primary'>
                            {user.first_name} {user.last_name}
                        </span> </Card.Title>
                        <Card.Subtitle>{user.title}</Card.Subtitle>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Employee Id</div>
                                {user.emp_no}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Gender</div>

                                {genderName[user.gender]}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Department</div>
                                {user.department}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Title</div>
                                {user.title}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Birth Date</div>
                                {user.birth_date.split("T")[0]}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Hire Date</div>
                                {user.hire_date.split("T")[0]}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Salary</div>
                                <span className='text-success'>$ {user.salary}</span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <a className="btn btn-primary" href={"/edituser?emp_no=" + emp_no}>Edit Details</a>
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

export default connect(mapStateToProps)(UserDetails);
