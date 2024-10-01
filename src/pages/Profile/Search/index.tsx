import { useEffect, useState } from "react";
import { IUser } from "../../../lib/types";
import { handleSearch } from "../../../lib/api";
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { NavLink } from "react-router-dom";

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (!text.trim()) {
            setUsers([]);
        } else {
            handleSearch(text)
                .then(response => {
                    setUsers(response.payload as IUser[]);
                })
                .catch(error => {
                    console.error("Search error:", error);
                });
        }
    }, [text]);

    return (
        <div style={{ padding: 5 }}>
            <h3>SEARCH</h3>
            <input 
                placeholder="Search for friends..."
                className="form-control"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            {users.length > 0 && <small>{users.length} users found!</small>}
            <div className="list">
                {users.map(user => (
                    <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img 
                            src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC} 
                            alt={`${user.name} ${user.surname}`} 
                            style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }} 
                        />
                        <div>
                            <p style={{ margin: 0 }}>{user.name} {user.surname}</p>
                            <NavLink to={`/profile/${user.id}`} className="btn btn-link">View Profile</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
