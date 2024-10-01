import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector } from "react-redux";

const Home = () => {
    const token = useSelector((state) => state.loginuser.token);
    // const token = localStorage.getItem('token');
    
    const [all_user, setUser] = useState([]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('firstname');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchUsers = async () => {
        if (!token) {
            console.error("No token found");
            return; // Exit if no token is available
        }
        
        try {
            const response = await axios.get('http://localhost:5000/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data.user || []); // Default to empty array if no user data
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const sortedUsers = all_user
        .filter((val) => {
            return (
                val.firstname.toLowerCase().includes(search.toLowerCase()) ||
                val.email.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort((a, b) => {
            const field1 = a[sortField].toLowerCase();
            const field2 = b[sortField].toLowerCase();
            return sortOrder === 'asc' ? (field1 > field2 ? 1 : -1) : (field1 < field2 ? 1 : -1);
        });

    return (
        <>
            <input 
                type="text" 
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
            <h1>Home Page</h1>
            {sortedUsers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Firstname (sorted {sortOrder})</th>
                            <th>Email (sorted {sortOrder})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((val, i) => (
                            <tr key={i}>
                                <td>{val.firstname}</td>
                                <td>{val.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found</p>
            )}
        </>
    );
};

export default Home;
