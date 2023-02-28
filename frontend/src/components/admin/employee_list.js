import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";

class employeeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const employees = this.props.employees;
        return (
            <>
                    {employees && employees.length ? employees.map((employee, index) => (
                        <Fragment key={`${employee}~${index}`}>
                            <Row>
                                <Card className="mb-1 items-body">
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                {employee.emp_no}
                                            </Col>
                                            <Col>
                                                {employee.first_name}
                                            </Col>
                                            <Col>
                                                {employee.last_name}
                                            </Col>
                                            <Col>
                                                {employee.dept_name}
                                            </Col>
                                            <Col>
                                                {employee.title}
                                            </Col>
                                            <Col>
                                                <a className="btn btn-primary" href={"/user?emp_no=" + employee.emp_no}>Details</a>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Row>
                        </Fragment>
                    ))
                        : <></>
                    }
                
                <br />
            </>
        );
    }
}

export default employeeItem;
