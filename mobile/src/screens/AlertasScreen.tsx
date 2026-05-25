import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getAlertas } from '../services/api';
import type { AlertaCritico } from '../types/mission';

const apiErrorMessage =
  'Nao foi possivel conectar a API. Verifique se o backend esta rodando na porta 8080.';

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleString('pt-BR') : null;
}

export function AlertasScreen() {
  const [alertas, setAlertas] = useState<AlertaCritico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlertas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAlertas(await getAlertas());
    } catch {
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlertas();
  }, [loadAlertas]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alertas Criticos</Text>
      <Text style={styles.description}>
        Aqui serao exibidos alertas da missao e sua situacao operacional.
      </Text>

      <Pressable style={styles.refreshButton} onPress={loadAlertas}>
        <Text style={styles.refreshText}>Atualizar</Text>
      </Pressable>

      {loading ? <Text style={styles.info}>Carregando alertas...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!loading && !error && alertas.length === 0 ? (
        <Text style={styles.info}>Nenhum alerta critico cadastrado ainda.</Text>
      ) : null}

      {alertas.map((alerta) => (
        <View key={alerta.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.origin}>{alerta.origem}</Text>
            <Text style={alerta.resolvido ? styles.resolved : styles.open}>
              {alerta.resolvido ? 'Resolvido' : 'Aberto'}
            </Text>
          </View>
          <Text style={styles.message}>{alerta.mensagem}</Text>
          <Text style={styles.severity}>Severidade: {alerta.severidade}</Text>
          {formatDate(alerta.dataAlerta) ? (
            <Text style={styles.meta}>Data: {formatDate(alerta.dataAlerta)}</Text>
          ) : null}
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
  message: {
    color: '#f5f8ff',
    fontSize: 16,
    lineHeight: 23,
  },
  meta: {
    color: '#8fa6c1',
    fontSize: 14,
  },
  open: {
    backgroundColor: '#4a1c23',
    borderRadius: 8,
    color: '#ff8a9b',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  origin: {
    color: '#f5f8ff',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  resolved: {
    backgroundColor: '#113f35',
    borderRadius: 8,
    color: '#71f0bc',
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  severity: {
    color: '#f0c96b',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#f5f8ff',
    fontSize: 26,
    fontWeight: '800',
  },
});
