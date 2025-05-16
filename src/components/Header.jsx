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
    };

    return (
        <nav className="flex justify-between items-center px-7 py-1 bg-base-200 shadow-sm">
            <ul>
                <li>
                    <a href="/" className="text-2xl font-bold no-underline"><strong>🎮 Gamer's Den</strong></a>
                </li>
            </ul>
            <ul className="flex gap-4 items-center">
                {session ? (
                    <li>
                        <details className="dropdown">
                            <summary className="text-lg font-medium cursor-pointer no-underline">
                                Ciao 👋🏻 {session.user.user_metadata.first_name}
                            </summary>
                            <ul dir="rtl" className="p-2 bg-base-100 shadow rounded-box w-40 mt-2 z-50 text-right">
                                <li><Link to="/profile" className="no-underline">Profilo</Link></li>
                                <li><Link to="/account" className="no-underline">Settings</Link></li>
                                <li><button onClick={signOut}>Logout</button></li>
                            </ul>
                        </details>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="secondary no-underline btn btn-sm btn-secondary">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="secondary no-underline btn btn-sm btn-primary">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}