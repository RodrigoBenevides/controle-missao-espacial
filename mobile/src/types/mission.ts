export type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  modulo: string;
  leitura: number;
  unidade: string;
  status: string;
  dataRegistro?: string;
};

export type SensorInput = {
  nome: string;
  tipo: string;
  modulo: string;
  leitura: number;
  unidade: string;
  status: string;
};

export type EventoOperacional = {
  id: number;
  sistemaMonitorado: string;
  descricao: string;
  status: string;
  dataEvento?: string;
};

export type EventoOperacionalInput = {
  sistemaMonitorado: string;
  descricao: string;
  status: string;
};

export type AlertaCritico = {
  id: number;
  origem: string;
  mensagem: string;
  severidade: string;
  resolvido: boolean;
  dataAlerta?: string;
};

export type AlertaCriticoInput = {
  origem: string;
  mensagem: string;
  severidade: string;
  resolvido: boolean;
};

export type RootStackParamList = {
  Dashboard: undefined;
  Sensores: undefined;
  Eventos: undefined;
  Alertas: undefined;
};
