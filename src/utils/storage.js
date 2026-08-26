import { normalizeData } from '../data/initialData.js';

export const STORAGE_KEY = 'painel-scrum-competitiva:v2';

export function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return new Date();
}

export function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalizeData(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export function downloadJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeTurma = (data.meta.turma || 'simulacao').replace(/[^a-z0-9A-Z_-]+/g, '_');

  link.href = url;
  link.download = `scrum_simulacao_${safeTurma}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        resolve(normalizeData(JSON.parse(event.target.result)));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
}
