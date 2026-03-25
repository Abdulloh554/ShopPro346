import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";

function Carusel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/carusel"
            );
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Xatolik:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="font-sans py-8 neu-bg min-h-screen">
            <div className="neu-flat rounded-[32px] overflow-hidden relative max-w-[1440px] mx-auto w-full p-2 md:p-4">
                <div className="rounded-[24px] overflow-hidden neu-pressed">
                    <Carousel arrows autoplay effect="fade" dotPosition="bottom">
                        {users.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-[500px] md:h-[650px] outline-none"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90 dark:opacity-80"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Carusel;