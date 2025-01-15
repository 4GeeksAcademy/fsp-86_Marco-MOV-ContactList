import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container text-center mt-5">
            <h1>Contact List</h1>
            <div className="row">
                {store.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default Home;