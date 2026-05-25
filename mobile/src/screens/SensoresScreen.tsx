import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getSensores } from '../services/api';
import type { Sensor } from '../types/mission';

const apiErrorMessage =
  'Nao foi possivel conectar a API. Verifique se o backend esta rodando na porta 8080.';

export function SensoresScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSensores = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSensores(await getSensores());
    } catch {
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSensores();
  }, [loadSensores]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores da Missao</Text>
      <Text style={styles.description}>
        Aqui serao exibidas as leituras dos sensores da missao.
      </Text>

      <Pressable style={styles.refreshButton} onPress={loadSensores}>
        <Text style={styles.refreshText}>Atualizar</Text>
      </Pressable>

      {loading ? <Text style={styles.info}>Carregando sensores...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!loading && !error && sensores.length === 0 ? (
        <Text style={styles.info}>Nenhum sensor cadastrado ainda.</Text>
      ) : null}

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
  error: {
    backgroundColor: '#4a1c23',
    borderColor: '#7f3341',
    borderRadius: 8,
    borderWidth: 1,
    color: '#ffb6c1',
    fontSize: 14,
    lineHeight: 20,
    padding: 12,
  },
  info: {
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
  refreshButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1b6f92',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  refreshText: {
    color: '#f5f8ff',
    fontSize: 14,
    fontWeight: '700',
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
