import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '../types/mission';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const summaryCards = [
  {
    label: 'Sensores',
    route: 'Sensores',
    value: '2 ativos',
    description: 'Leituras principais da missao',
  },
  {
    label: 'Eventos operacionais',
    route: 'Eventos',
    value: '2 registros',
    description: 'Acompanhamento dos sistemas',
  },
  {
    label: 'Alertas criticos',
    route: 'Alertas',
    value: '1 aberto',
    description: 'Pontos que exigem atencao',
  },
] as const;

export function DashboardScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Missao em operacao</Text>
        <Text style={styles.title}>Controle de Missao Espacial</Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Status geral</Text>
          <Text style={styles.statusValue}>Estavel</Text>
        </View>
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
