import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createSensor, getSensores } from '../services/api';
import type { Sensor } from '../types/mission';

const apiErrorMessage =
  'Nao foi possivel conectar a API. Verifique se o backend esta rodando na porta 8080.';

export function SensoresScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [modulo, setModulo] = useState('');
  const [leitura, setLeitura] = useState('');
  const [unidade, setUnidade] = useState('');
  const [status, setStatus] = useState('Ativo');

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

  async function handleCreateSensor() {
    const leituraNumerica = Number(leitura.replace(',', '.'));

    if (!nome.trim() || !tipo.trim() || !modulo.trim() || !unidade.trim() || !status.trim()) {
      setSuccess(null);
      setError('Preencha os campos obrigatorios do sensor.');
      return;
    }

    if (!Number.isFinite(leituraNumerica)) {
      setSuccess(null);
      setError('Informe uma leitura numerica valida.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await createSensor({
        nome: nome.trim(),
        tipo: tipo.trim(),
        modulo: modulo.trim(),
        leitura: leituraNumerica,
        unidade: unidade.trim(),
        status: status.trim(),
      });
      setNome('');
      setTipo('');
      setModulo('');
      setLeitura('');
      setUnidade('');
      setStatus('Ativo');
      setSuccess('Sensor cadastrado com sucesso.');
      await loadSensores();
    } catch {
      setSuccess(null);
      setError(apiErrorMessage);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensores da Missao</Text>
      <Text style={styles.description}>
        Aqui serao exibidas as leituras dos sensores da missao.
      </Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Cadastrar sensor</Text>
        <TextInput
          onChangeText={setNome}
          placeholder="Nome"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={nome}
        />
        <TextInput
          onChangeText={setTipo}
          placeholder="Tipo"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={tipo}
        />
        <TextInput
          onChangeText={setModulo}
          placeholder="Modulo"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={modulo}
        />
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={setLeitura}
          placeholder="Leitura"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={leitura}
        />
        <TextInput
          onChangeText={setUnidade}
          placeholder="Unidade"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={unidade}
        />
        <TextInput
          onChangeText={setStatus}
          placeholder="Status"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={status}
        />
        <Pressable
          disabled={saving}
          onPress={handleCreateSensor}
          style={[styles.primaryButton, saving ? styles.disabledButton : null]}
        >
          <Text style={styles.refreshText}>
            {saving ? 'Cadastrando...' : 'Cadastrar sensor'}
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.refreshButton} onPress={loadSensores}>
        <Text style={styles.refreshText}>Atualizar</Text>
      </Pressable>

      {loading ? <Text style={styles.info}>Carregando sensores...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
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
  disabledButton: {
    opacity: 0.6,
  },
  form: {
    backgroundColor: '#0d1d31',
    borderColor: '#244b68',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  formTitle: {
    color: '#f5f8ff',
    fontSize: 17,
    fontWeight: '700',
  },
  info: {
    color: '#aebed2',
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#081522',
    borderColor: '#244b68',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f5f8ff',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#257fa5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  success: {
    backgroundColor: '#113f35',
    borderColor: '#2b9b7d',
    borderRadius: 8,
    borderWidth: 1,
    color: '#71f0bc',
    fontSize: 14,
    lineHeight: 20,
    padding: 12,
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
