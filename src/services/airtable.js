const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

export const fetchAppointments = async () => {
  try {
    const response = await fetch(BASE_URL, { headers });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log(data);
    return data.records.map(record => ({
      id: record.id,
      appointmentId: record.fields.appointment_id,
      date: record.fields.appointment_date,
      address: record.fields.appointment_address,
      contactId: record.fields.contact_id[0], // Assuming we want the first ID
      isCancelled: record.fields.is_cancelled,
      name: record.fields.contact_name[0], // Assuming we want the first name
      surname: record.fields.contact_surname[0], // Assuming we want the first surname
      email: record.fields.contact_email[0], // Assuming we want the first email
      phone: record.fields.contact_phone[0], // Assuming we want the first phone number
    }));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fields: appointmentData })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return {
      id: data.id,
      ...data.fields
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ fields: updatedData })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return {
      id: data.id,
      ...data.fields
    };
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};