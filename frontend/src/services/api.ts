import type { Person, PeopleStats } from '../types/Equipment.ts';

const API_BASE_URL = 'http://localhost:5165/api';

export const peopleApi = {
  async getAll(): Promise<Person[]> {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) throw new Error('Failed to fetch people');
    return response.json();
  },

  async getById(id: number): Promise<Person> {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);
    if (!response.ok) throw new Error('Failed to fetch person');
    return response.json();
  },

  async updateStatus(id: number, status: string): Promise<Person> {
    const response = await fetch(`${API_BASE_URL}/people/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update person status');
    return response.json();
  },

  async getStats(): Promise<PeopleStats> {
    const response = await fetch(`${API_BASE_URL}/people/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async create(person: Omit<Person, 'id' | 'metSince'>): Promise<Person> {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) throw new Error('Failed to create person');
    return response.json();
  },

  async update(id: number, person: Omit<Person, 'id' | 'metSince'>): Promise<Person> {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    if (!response.ok) throw new Error('Failed to update person');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete person');
  },
};
