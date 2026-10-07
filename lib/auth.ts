// lib/auth.ts

const AUTH_KEY = "cumple_auth_passed";
const UNLOCKED_KEY = "cumple_unlocked_sections";
export const MASTER_PASSWORD = "sofi30";

export function checkPassword(input: string): boolean {
  return input.trim().toLowerCase() === MASTER_PASSWORD.toLowerCase();
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(status: boolean): void {
  if (typeof window === "undefined") return;
  if (status) {
    localStorage.setItem(AUTH_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getUnlockedSections(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function unlockSection(sectionId: string): string[] {
  if (typeof window === "undefined") return [];
  const current = getUnlockedSections();
  if (!current.includes(sectionId)) {
    const updated = [...current, sectionId];
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
}

export function isSectionUnlocked(sectionId: string): boolean {
  const unlocked = getUnlockedSections();
  return unlocked.includes(sectionId);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(UNLOCKED_KEY);
}
