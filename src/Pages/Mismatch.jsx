import React, { useEffect, useState } from 'react'
import './admindashboardscripts.js'
import './admindashboardstyles.css'
import './admindatatable.js'
import './datatables-demo.js'
import { Link, useNavigate } from 'react-router-dom'
import { getAllPlacementsAPI } from '../Services/AllApi.js'
import { Table } from 'react-bootstrap'

function AdminDashboard() {
    const [allPlacementData, setAllPlacementData] = useState([])

    const getAllData = async () => {
        try {
            const result = await getAllPlacementsAPI()
            if (result.status == 200) {
                setAllPlacementData(result.data)
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        navigate('/')
    }
    const user = sessionStorage.getItem('existingUser')


    console.log(allPlacementData);

    const placement = () => {
        navigate('/admin-table')
    }
    const [json1, setJson1] = useState(JSON.stringify([
        { "id": 1, "name": "Alice", "age": 25, "email": "alice@example.com" },
        { "id": 2, "name": "Bob", "age": 30, "email": "bob@example.com" },
        { "id": 3, "name": "Charlie", "age": 35, "email": "charlie@example.com" },
        { "id": 4, "name": "David", "age": 40, "email": "david@example.com" },
        { "id": 5, "name": "Eve", "age": 45, "email": "eve@example.com" },
        { "id": 6, "name": "Frank", "age": 50, "email": "frank@example.com" },
        { "id": 7, "name": "Grace", "age": 55, "email": "grace@example.com" },
        { "id": 8, "name": "Heidi", "age": 60, "email": "heidi@example.com" },
        { "id": 9, "name": "Ivan", "age": 65, "email": "ivan@example.com" },
        { "id": 10, "name": "Judy", "age": 70, "email": "judy@example.com" }
    ], null, 2));

    const [json2, setJson2] = useState(JSON.stringify([
        { "id": 1, "name": "Alice", "age": 26, "email": "alice_new@example.com" },
        { "id": 2, "name": "Bob", "age": 30, "email": "bob@example.com" },
        { "id": 3, "name": "Charlie", "age": 36, "email": "charlie_new@example.com" },
        { "id": 4, "name": "David", "age": 40, "email": "david@example.com" },
        { "id": 5, "name": "Eve", "age": 45, "email": "eve_new@example.com" },
        { "id": 6, "name": "Frank", "age": 51, "email": "frank@example.com" },
        { "id": 7, "name": "Grace", "age": 55, "email": "grace@example.com" },
        { "id": 8, "name": "Heidi", "age": 60, "email": "heidi@example.com" },
        { "id": 9, "name": "Ivan", "age": 66, "email": "ivan_new@example.com" },
        { "id": 10, "name": "Judy", "age": 70, "email": "judy@example.com" }
    ], null, 2));

    const [mismatchedData, setMismatchedData] = useState([]);
    const [error, setError] = useState('');

    const handleCompare = () => {
        try {
            const obj1 = JSON.parse(json1);
            const obj2 = JSON.parse(json2);
            const mismatches = findMismatches(obj1, obj2);
            setMismatchedData(mismatches);
            setError('');
        } catch (error) {
            setError('Invalid JSON');
            setMismatchedData([]);
        }
    };

    const findMismatches = (obj1, obj2) => {
        let mismatches = [];
        obj1.forEach((item1, index) => {
            const item2 = obj2[index];
            for (let key in item1) {
                if (item1[key] !== item2[key]) {
                    mismatches.push(`${index}.${key}`);
                }
            }
        });
        return mismatches;
    };

    const misMatchTable = (obj1, obj2) => {
        return (
            <table className='table table-stripped mt-5' border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {obj1.map((item1, index) => {
                        const item2 = obj2[index];
                        return (
                            <tr key={item1.id}>
                                {Object.keys(item1).map(key => {
                                    const currentPath = `${index}.${key}`;
                                    const isMismatch = mismatchedData.includes(currentPath);
                                    return (
                                        <td key={key} style={{ color: isMismatch ? 'red' : 'black' }}>
                                            {item1[key]} / {item2 ? item2[key] : 'N/A'}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                    <a class="navbar-brand ps-3">Placement Cell</a>
                </Link>

                {/* <!-- Sidebar Toggle--> */}
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                <p className='text-light ms-5'>Welcome<span className='text-warning'>{user}</span></p>
                {/* <!-- Navbar Search--> */}
                <div className='ms-5 d-flex' style={{ position: 'absolute', right: '450px' }}>
                    <i className="fa-solid fa-users text-warning ms-5"></i><sup className='text-light'>10</sup>
                    <i class="fa-regular fa-address-card text-warning ms-1"></i><sup className='text-light'>15</sup>
                    <i class="fa-solid fa-laptop text-warning ms-1"></i><sup className='text-light'>20 </sup>
                </div>
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                {/* <!-- Navbar--> */}
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item"><button className='btn' onClick={logout}>Logout</button></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <div class="sb-sidenav-menu-heading">Core</div>
                                <Link to={'/admindashboard'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                        Dashboard
                                    </a>
                                </Link>
                                <Link to={'/mismatch'} style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                        Mismatch Data
                                    </a>
                                </Link>
                                <div class="sb-sidenav-menu-heading">Addons</div>

                                <Link style={{ textDecoration: 'none' }}>
                                    <a class="nav-link">
                                        <div class="sb-nav-link-icon"><i className="fas fa-user-tie"></i></div>
                                        Placements
                                    </a>
                                </Link>

                            </div>
                        </div>
                        <div class="sb-sidenav-footer">
                            <div class="small">Logged in as:</div>
                            Placement Cell
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h3 className='text-center mt-5 text-danger'>Check Mismatch Data</h3>
                            <div className='container text-center mt-5'>
                                <textarea className='me-5'
                                    rows="10"
                                    cols="30"
                                    value={json1}
                                    onChange={(e) => setJson1(e.target.value)}
                                    placeholder="Enter first JSON"
                                ></textarea>
                                <textarea
                                    rows="10"
                                    cols="30"
                                    value={json2}
                                    onChange={(e) => setJson2(e.target.value)}
                                    placeholder="Enter second JSON"
                                ></textarea>
                                <button className='btn btn-success ms-5' onClick={handleCompare}>Compare</button>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className='text-center'>
                                    {!error && misMatchTable(JSON.parse(json1), JSON.parse(json2))}
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>


        </>
    )
}

export default AdminDashboard