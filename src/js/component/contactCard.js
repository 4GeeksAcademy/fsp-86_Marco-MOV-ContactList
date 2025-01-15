import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log("Eliminando contacto con ID:", contact.id);
        await actions.deleteContact(contact.id);
    };

    const handleEdit = () => {
        console.log("Editando contacto con ID:", contact.id);
        navigate(`/edit-contact/${contact.id}`);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{contact.name !== "string" ? contact.name : "Unknown Contact"}</h5>
                    <p className="card-text"><strong>Address:</strong> {contact.address || "No address provided"}</p>
                    <p className="card-text"><strong>Phone:</strong> {contact.phone || "No phone provided"}</p>
                    <p className="card-text"><strong>Email:</strong> {contact.email || "No email provided"}</p>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;