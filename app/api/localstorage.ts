'use client';

export type LocalStorageKey = 'activeStep' | 'formValues';

export function getItem(key: LocalStorageKey): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function setItem(key: LocalStorageKey, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
  return null;
}

export function removeItem(key: LocalStorageKey) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
  return null;
}
