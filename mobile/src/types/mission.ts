export type Sensor = {
  id: string;
  nome: string;
  tipo: string;
  modulo: string;
  leitura: number;
  unidade: string;
  status: string;
};

export type EventoOperacional = {
  id: string;
  sistemaMonitorado: string;
  descricao: string;
  status: string;
};

export type AlertaCritico = {
  id: string;
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
