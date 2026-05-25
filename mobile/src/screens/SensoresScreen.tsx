import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { Sensor } from '../types/mission';

const sensores: Sensor[] = [
  {
    id: '1',
    nome: 'Sensor de Oxigenio',
    tipo: 'Oxigenio',
    modulo: 'Modulo de Suporte a Vida',
    leitura: 98.7,
    unidade: '%',
    status: 'Ativo',
  },
  {
    id: '2',
    nome: 'Sensor de Temperatura',
    tipo: 'Temperatura',
    modulo: 'Modulo Orbital',
    leitura: 23.5,
    unidade: 'Celsius',
    status: 'Ativo',
  },
];

export function SensoresScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores da Missao</Text>
      <Text style={styles.description}>
        Aqui serao exibidas as leituras dos sensores da missao.
      </Text>

      {sensores.map((sensor) => (
        <View key={sensor.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.name}>{sensor.nome}</Text>
            <Text style={styles.status}>{sensor.status}</Text>
          </View>
          <Text style={styles.meta}>{sensor.modulo}</Text>
          <Text style={styles.value}>
            {sensor.leitura} {sensor.unidade}
          </Text>
          <Text style={styles.meta}>Tipo: {sensor.tipo}</Text>
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
  meta: {
    color: '#8fa6c1',
    fontSize: 14,
  },
  name: {
    color: '#f5f8ff',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  status: {
    backgroundColor: '#113f35',
    borderRadius: 8,
    color: '#71f0bc',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: '#f5f8ff',
    fontSize: 26,
    fontWeight: '800',
  },
  value: {
    color: '#67d8ff',
    fontSize: 22,
    fontWeight: '800',
  },
});
