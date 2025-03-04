const API_URL = "http://localhost:8000";

export const fetchEducation = async () => (await fetch(`${API_URL}/getEdu`)).json();
export const fetchExperience = async () => (await fetch(`${API_URL}/getExp`)).json();
export const fetchOverview = async () => (await fetch(`${API_URL}/getOverview`)).json();
export const fetchSkills = async () => (await fetch(`${API_URL}/getSkills`)).json();
export const fetchCertifications = async () => (await fetch(`${API_URL}/getCertifications`)).json();
