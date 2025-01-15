const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            getContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts');
                    console.log("Respuesta de la API al obtener contactos:", response);

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Datos de contactos recibidos:", data);

                        setStore({ contacts: data.contacts });
                        console.log("Contactos guardados en el store:", getStore().contacts);
                    } else if (response.status === 404) {
                        console.log("Agenda no encontrada, creando una nueva agenda...");
                        await getActions().agenda();
                    } else {
                        console.error("Error al obtener contactos:", response.status);
                    }
                } catch (error) {
                    console.error("Error al obtener los contactos:", error);
                }
            },
            agenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ agenda_slug: "Marco_Ortiz" })
                    });

                    if (response.ok) {
                        console.log("Agenda creada exitosamente.");
                        await getActions().getContacts();
                    } else {
                        const data = await response.json();
                        console.error("Error al crear la agenda:", response.status, data);
                    }
                } catch (error) {
                    console.error("Error al crear la agenda:", error);
                }
            },
            addContact: async (contact) => {
                console.log("Datos del contacto enviados al servidor:", contact);

                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...contact, agenda_slug: "Marco_Ortiz" })
                    });

                    const data = await response.json();
                    console.log("Respuesta del servidor al agregar contacto:", data);

                    if (response.ok) {
                        console.log("Contacto agregado exitosamente.");
                        await getActions().getContacts();
                    } else {
                        console.error("Error al agregar el contacto:", response.status, data);
                    }
                } catch (error) {
                    console.error("Error al agregar el contacto:", error);
                }
            },
            deleteContact: async (id) => {
                try {
                    console.log("Eliminando contacto con ID:", id);
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts/${id}`, {
                        method: 'DELETE'
                    });
            
                    if (response.ok) {
                        console.log("Contacto eliminado exitosamente.");
                        await getActions().getContacts();
                    } else {
                        console.error("Error al eliminar el contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al eliminar el contacto:", error);
                }
            }
        }
    };
};

export default getState;