import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/avatar";

export default function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstname] = useState(null);
    const [last_name, setLastname] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (!session) return;

        let ignore = false;

        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name, avatar_url`)
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstname(data.first_name);
                    setLastname(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
                setLoading(false);
            }
        };

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    const updateProfile = async (event, avatar_url) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates)
        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatar_url);
        }
        setLoading(false);
    }

    return (
        <div className="container">
            <h2>Profile Settings</h2>
            <form onSubmit={updateProfile} className="form-widget">
                <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url);
                }}
                />
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        id="last_name"
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit" 
                    disabled={loading}
                >
                    {loading ? "Loading ..." : "Update"}
                </button>
                </div>
            </form>
        </div>
    )
}