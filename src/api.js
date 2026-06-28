const BASE_URL = "http://localhost:5000/api";

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Save failed");
  return res.json();
};

export const getAllDescriptions = async () => {
  const res = await fetch(`${BASE_URL}/descriptions`);
  return res.json();
};

export const updateDescription = async (id, data) => {
  const res = await fetch(`${BASE_URL}/descriptions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteDescription = async (id) => {
  const res = await fetch(`${BASE_URL}/descriptions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
};

export const searchDescriptions = async (q) => {
  const res = await fetch(`${BASE_URL}/descriptions/search?q=${q}`);
  return res.json();
};