import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getAlertas, getEventos, getHealth, getSensores } from '../services/api';
import type { RootStackParamList } from '../types/mission';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const apiErrorMessage =
  'Nao foi possivel conectar a API. Verifique se o backend esta rodando na porta 8080.';

export function DashboardScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState('Indisponivel');
  const [counts, setCounts] = useState({
    sensores: 0,
    eventos: 0,
    alertas: 0,
  });

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [health, sensores, eventos, alertas] = await Promise.all([
        getHealth(),
        getSensores(),
        getEventos(),
        getAlertas(),
      ]);

      setApiStatus(health.status);
      setCounts({
        sensores: sensores.length,
        eventos: eventos.length,
        alertas: alertas.length,
      });
    } catch {
      setApiStatus('Indisponivel');
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const summaryCards = [
    {
      label: 'Sensores',
      route: 'Sensores',
      value: loading ? '...' : String(counts.sensores),
      description: 'Sensores cadastrados na API',
    },
    {
      label: 'Eventos operacionais',
      route: 'Eventos',
      value: loading ? '...' : String(counts.eventos),
      description: 'Registros operacionais salvos',
    },
    {
      label: 'Alertas criticos',
      route: 'Alertas',
      value: loading ? '...' : String(counts.alertas),
      description: 'Alertas criticos registrados',
    },
  ] as const;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Missao em operacao</Text>
        <Text style={styles.title}>Controle de Missao Espacial</Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Status da API</Text>
          <Text style={styles.statusValue}>{loading ? 'Carregando...' : apiStatus}</Text>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={styles.refreshButton} onPress={loadDashboard}>
          <Text style={styles.refreshText}>Atualizar</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {summaryCards.map((card) => (
          <Pressable
            key={card.route}
            onPress={() => navigation.navigate(card.route)}
            style={({ pressed }) => [
              styles.card,
              pressed ? styles.cardPressed : null,
            ]}
          >
            <Text style={styles.cardLabel}>{card.label}</Text>
            <Text style={styles.cardValue}>{card.value}</Text>
            <Text style={styles.cardText}>{card.description}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#10243a',
    borderColor: '#244b68',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 118,
    padding: 16,
  },
  cardLabel: {
    color: '#b8c7dc',
    fontSize: 14,
    fontWeight: '600',
  },
  cardPressed: {
    backgroundColor: '#16304d',
  },
  cardText: {
    color: '#8fa6c1',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  cardValue: {
    color: '#67d8ff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  container: {
    gap: 18,
    padding: 20,
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
  eyebrow: {
    color: '#67d8ff',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  grid: {
    gap: 12,
  },
  header: {
    gap: 14,
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
  statusBox: {
    backgroundColor: '#132238',
    borderColor: '#2b9b7d',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  statusLabel: {
    color: '#9fb2c9',
    fontSize: 14,
  },
  statusValue: {
    color: '#71f0bc',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
  },
  title: {
    color: '#f5f8ff',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
});
