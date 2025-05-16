import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import supabase from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';

export default function Header () {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error)
        alert("Signed Out 👍🏻!");
        navigate("/");
    }

    return (
        <nav className="style-header">
            <ul>
                <li>
                    <a href="/"><strong>Gamer's Den</strong></a>
                </li>
            </ul>
            <ul>
                <li>
                    <details className="dropdown">
                        <summary>Ciao 👋🏻 {session?.user.user_metadata.first_name}</summary>
                        <ul dir="rtl">
                            <li>
                                <Link to="/profile">Profilo</Link>
                            </li>
                            <li>
                                <Link to="/account">Settings</Link>
                            </li>
                            <li>
                                <button onClick={signOut}>logout</button>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <Link to="/login" className="secondary">Login</Link>
                </li>
                <li>
                    <Link to="/register" className="secondary">Register</Link>
                </li>
            </ul>
        </nav>        
    );
}