const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const generateDescription = async (formData) => {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Generation failed");
  return res.json();
};

export const saveDescription = async (data) => {
  const res = await fetch(`${BASE_URL}/descriptions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Save failed");
  return res.json();
};

export const getAllDescriptions = async () => {
  const res = await fetch(`${BASE_URL}/descriptions`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const updateDescription = async (id, data) => {
  const res = await fetch(`${BASE_URL}/descriptions/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteDescription = async (id) => {
  const res = await fetch(`${BASE_URL}/descriptions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
};

export const searchDescriptions = async (q) => {
  const res = await fetch(`${BASE_URL}/descriptions/search?q=${q}`, {
    headers: authHeaders(),
  });
  return res.json();
};