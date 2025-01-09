const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            getContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts');
					console.log("Respuesta de la API:", response);
                    if (response.ok) {
                        const data = await response.json();
						console.log("Datos de contactos recibidos:", data.contacts);
                        setStore({ contacts: data.contacts }); 
                    } else {
                        console.log("Error al obtener contactos. Creando agenda...");
                        getActions().crearAgenda();
                    }
                } catch (error) {
                    console.error('Error al obtener los contactos:', error);
                }
            },
            agenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        throw new Error('No se pudo crear la agenda');
                    }
                } catch (error) {
                    console.error('Error al crear la agenda:', error);
                }
            },
            
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact) 
                    });
                    if (response.ok) {
                        getActions().getContacts(); 
                    } else {
                        throw new Error('No se pudo agregar el contacto');
                    }
                } catch (error) {
                    console.error('Error al agregar el contacto:', error);
                }
            },
            
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedContact) 
                    });
                    if (response.ok) {
                        getActions().getContacts(); 
                    } else {
                        throw new Error('No se pudo actualizar el contacto');
                    }
                } catch (error) {
                    console.error('Error al actualizar el contacto:', error);
                }
            },
            
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Marco_Ortiz/contacts/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        getActions().getContacts(); 
                    } else {
                        throw new Error('No se pudo eliminar el contacto');
                    }
                } catch (error) {
                    console.error('Error al eliminar el contacto:', error);
                }
            }
        }
    };
};

export default getState;