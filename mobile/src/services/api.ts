import type {
  AlertaCritico,
  AlertaCriticoInput,
  EventoOperacional,
  EventoOperacionalInput,
  Sensor,
  SensorInput,
} from '../types/mission';

// Browser/web: use http://localhost:8080
// Android emulator: use http://10.0.2.2:8080
// Physical device: use http://IP_DA_MAQUINA:8080
export const API_BASE_URL = 'http://localhost:8080';

export type HealthResponse = {
  status: string;
  service: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error('Resposta invalida da API.');
  }

  return response.json() as Promise<T>;
}

export function getHealth() {
  return request<HealthResponse>('/api/health');
}

export function getSensores() {
  return request<Sensor[]>('/api/sensores');
}

export function getEventos() {
  return request<EventoOperacional[]>('/api/eventos');
}

export function getAlertas() {
  return request<AlertaCritico[]>('/api/alertas');
}

export function createSensor(sensor: SensorInput) {
  return request<Sensor>('/api/sensores', {
    body: JSON.stringify(sensor),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export function createEvento(evento: EventoOperacionalInput) {
  return request<EventoOperacional>('/api/eventos', {
    body: JSON.stringify(evento),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export function createAlerta(alerta: AlertaCriticoInput) {
  return request<AlertaCritico>('/api/alertas', {
    body: JSON.stringify(alerta),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
