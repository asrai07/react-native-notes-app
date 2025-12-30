import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { supabase } from './supabase';

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      setNotes(data || []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    if (isConnected) {
      fetchNotes();
    }

    return () => unsubscribe();
  }, [isConnected, fetchNotes]);

  
  if (!isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineIcon}>📡</Text>
        <Text style={styles.offlineTitle}>No Internet Connection</Text>
        <Text style={styles.offlineSubtitle}>
          Please check your network and try again.
        </Text>
      </View>
    );
  }

  const handleSaveNote = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Note', 'Please add a title or content.');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (editingNoteId) {
      await supabase
        .from('notes')
        .update({
          title: title.trim(),
          content: content.trim(),
        })
        .eq('id', editingNoteId);

      setEditingNoteId(null);
    } else {
      await supabase.from('notes').insert({
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
      });
    }

    setTitle('');
    setContent('');
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await supabase.from('notes').delete().eq('id', id);
    fetchNotes();
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title || 'Untitled'}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>

      <View style={styles.noteActions}>
        <TouchableOpacity onPress={() => {
          setTitle(item.title);
          setContent(item.content);
          setEditingNoteId(item.id);
        }}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 My Notes</Text>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      
      <View style={styles.inputCard}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#5b5353ff"
          style={styles.input}
        />
       <Text style={styles.label}>Enter Text</Text>
        <TextInput
          placeholder="Write your note..."
          value={content}
          onChangeText={setContent}
          placeholderTextColor="#5b5353ff"
          multiline
          style={[styles.input, styles.contentInput]}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleSaveNote}>
          <Text style={styles.addButtonText}>
            {editingNoteId ? 'Update Note' : 'Add Note'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#4A6CF7" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchNotes();
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No notes found. Add your first note ✨
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },

  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  offlineIcon: { fontSize: 48 },
  offlineTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  offlineSubtitle: { color: '#666', marginTop: 6 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  logout: { color: '#E74C3C', fontWeight: '600' },

  inputCard: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  contentInput: {
    height: 80,
    textAlignVertical: 'top',
  },

  addButton: {
    backgroundColor: '#4A6CF7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: { color: '#FFF', fontWeight: 'bold' },

  noteCard: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  noteTitle: { fontSize: 16, fontWeight: 'bold' },
  noteContent: { color: '#444', marginTop: 4 },

  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 16,
  },
  editText: { color: '#4A6CF7', fontWeight: '600' },
  deleteText: { color: '#E74C3C', fontWeight: '600' },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
  },
    label: {
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 6,
  color: '#333',
},
});
