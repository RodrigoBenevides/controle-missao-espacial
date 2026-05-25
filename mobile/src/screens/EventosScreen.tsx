import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createEvento, getEventos } from '../services/api';
import type { EventoOperacional } from '../types/mission';

const apiErrorMessage =
  'Nao foi possivel conectar a API. Verifique se o backend esta rodando na porta 8080.';

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleString('pt-BR') : null;
}

export function EventosScreen() {
  const [eventos, setEventos] = useState<EventoOperacional[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sistemaMonitorado, setSistemaMonitorado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Normal');

  const loadEventos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setEventos(await getEventos());
    } catch {
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  async function handleCreateEvento() {
    if (!sistemaMonitorado.trim() || !descricao.trim() || !status.trim()) {
      setSuccess(null);
      setError('Preencha os campos obrigatorios do evento.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await createEvento({
        sistemaMonitorado: sistemaMonitorado.trim(),
        descricao: descricao.trim(),
        status: status.trim(),
      });
      setSistemaMonitorado('');
      setDescricao('');
      setStatus('Normal');
      setSuccess('Evento cadastrado com sucesso.');
      await loadEventos();
    } catch {
      setSuccess(null);
      setError(apiErrorMessage);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eventos Operacionais</Text>
      <Text style={styles.description}>
        Aqui serao exibidos os registros operacionais dos sistemas monitorados.
      </Text>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Cadastrar evento</Text>
        <TextInput
          onChangeText={setSistemaMonitorado}
          placeholder="Sistema monitorado"
          placeholderTextColor="#70849f"
          style={styles.input}
          value={sistemaMonitorado}
        />
        <TextInput
          multiline
          onChangeText={setDescricao}
          placeholder="Descricao"
          placeholderTextColor="#70849f"
          style={[styles.input, styles.textArea]}
          value={descricao}
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
          onPress={handleCreateEvento}
          style={[styles.primaryButton, saving ? styles.disabledButton : null]}
        >
          <Text style={styles.refreshText}>
            {saving ? 'Cadastrando...' : 'Cadastrar evento'}
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.refreshButton} onPress={loadEventos}>
        <Text style={styles.refreshText}>Atualizar</Text>
      </Pressable>

      {loading ? <Text style={styles.info}>Carregando eventos...</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {!loading && !error && eventos.length === 0 ? (
        <Text style={styles.info}>Nenhum evento operacional cadastrado ainda.</Text>
      ) : null}

      {eventos.map((evento) => (
        <View key={evento.id} style={styles.card}>
          <Text style={styles.system}>{evento.sistemaMonitorado}</Text>
          <Text style={styles.text}>{evento.descricao}</Text>
          <Text style={styles.status}>{evento.status}</Text>
          {formatDate(evento.dataEvento) ? (
            <Text style={styles.meta}>Data: {formatDate(evento.dataEvento)}</Text>
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
  meta: {
    color: '#8fa6c1',
    fontSize: 14,
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
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#257fa5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  text: {
    color: '#aebed2',
    fontSize: 15,
    lineHeight: 22,
  },
  textArea: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
  title: {
    color: '#f5f8ff',
    fontSize: 26,
    fontWeight: '800',
  },
});
