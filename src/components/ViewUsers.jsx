import { useEffect } from "react";
import axios from 'axios';

function ViewUser() {
    // const [user, setUser] = useState([]); // initialize with an empty array

    useEffect(() => {
        async function getAllUser() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/app/userview/');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllUser();
    }, []);

    return (
        <>
            <h1>React Django MESH</h1>
            {/* Render the user data here */}
        </>
    );
}

export default ViewUser; // Correctly export the component
