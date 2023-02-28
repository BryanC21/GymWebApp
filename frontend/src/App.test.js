import { render, screen } from '@testing-library/react';
import Employees from './components/admin/employees';
import EmployeeList from './components/admin/employee_list';
import SSO from './components/sso/sso';
import Departments from './components/admin/departments';

test('renders employees page', () => {
    render(<Employees />);

    expect(screen.getAllByRole("option").length).toBe(2);
    expect(screen.getAllByRole("combobox").length).toBe(2);
    expect(screen.getAllByRole("textbox").length).toBe(1);
});

test('renders departments page', () => {
    render(<Departments />);

    expect(screen.getAllByRole("heading", { name: 'Departments' }).length).toBe(1);
    expect(screen.getAllByRole("button", { name: 'Add Department' }).length).toBe(1);
});

test('renders employee_list page', () => {
    render(<EmployeeList />);
});

async function getDepartments() {
    try {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var response = await fetch(api + "/api/user/getDepartments");
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getTitles() {
    try {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var response = await fetch(api + "/api/user/getTitles");
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getEmployees() {
    try {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var response = await fetch(api + "/api/admin/getEmployeesCurrentSorted");
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getManagers() {
    try {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        var response = await fetch(api + "/api/user/getDepartmentsManagers");
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

it('Test get departments', async () => {
    const data = await getDepartments();
    expect(data.results.length).toBeGreaterThan(0);
});

it('Test get titles', async () => {
    const data = await getTitles();
    expect(data.results.length).toBeGreaterThan(0);
});

it('Test get employees', async () => {
    const data = await getEmployees();
    expect(data.results.length).toBeGreaterThan(0);
});

it('Test get managers', async () => {
    const data = await getManagers();
    expect(data.results.length).toBeGreaterThan(0);
});