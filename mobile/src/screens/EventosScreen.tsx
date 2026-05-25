import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { EventoOperacional } from '../types/mission';

const eventos: EventoOperacional[] = [
  {
    id: '1',
    sistemaMonitorado: 'Sistema de Comunicacao',
    descricao: 'Sinal restabelecido com a central de controle',
    status: 'Normal',
  },
  {
    id: '2',
    sistemaMonitorado: 'Sistema de Navegacao',
    descricao: 'Ajuste automatico de rota executado',
    status: 'Normal',
  },
];

export function EventosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eventos Operacionais</Text>
      <Text style={styles.description}>
        Aqui serao exibidos os registros operacionais dos sistemas monitorados.
      </Text>

      {eventos.map((evento) => (
        <View key={evento.id} style={styles.card}>
          <Text style={styles.system}>{evento.sistemaMonitorado}</Text>
          <Text style={styles.text}>{evento.descricao}</Text>
          <Text style={styles.status}>{evento.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#10243a',
    borderColor: '#244b68',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  container: {
    gap: 14,
    padding: 20,
  },
  description: {
    color: '#aebed2',
    fontSize: 15,
    lineHeight: 22,
  },
  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#142f4f',
    borderRadius: 8,
    color: '#67d8ff',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  system: {
    color: '#f5f8ff',
    fontSize: 17,
    fontWeight: '700',
  },
  text: {
    color: '#aebed2',
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: '#f5f8ff',
    fontSize: 26,
    fontWeight: '800',
  },
});
