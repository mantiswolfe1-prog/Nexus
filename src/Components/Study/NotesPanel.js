import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Trash2, Save } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';
import { Input } from '../UI/input';
import { Textarea } from '../UI/textarea';

const SAMPLE_NOTES = [
  { id: 1, title: 'Math Formulas', content: 'Quadratic formula: x = (-b ± √(b²-4ac)) / 2a', category: 'math' },
  { id: 2, title: 'History Timeline', content: 'Key events of WWII...', category: 'history' },
  { id: 3, title: 'Chemistry Notes', content: 'Periodic table elements...', category: 'science' },
];

export default function NotesPanel({ accentColor = '#a55eea' }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const [activeNote, setActiveNote] = useState(null);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState({ title: '', content: '' });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      category: 'other'
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNote(newNote);
    setEditContent({ title: newNote.title, content: newNote.content });
    setIsEditing(true);
  };

  const saveNote = () => {
    if (activeNote) {
      setNotes(prev => prev.map(note => 
        note.id === activeNote.id 
          ? { ...note, title: editContent.title, content: editContent.content }
          : note
      ));
      setIsEditing(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNote?.id === id) {
      setActiveNote(null);
    }
  };

  const selectNote = (note) => {
    setActiveNote(note);
    setEditContent({ title: note.title, content: note.content });
    setIsEditing(false);
  };

  return (
    <GlassCard className="p-4 h-[500px] flex flex-col" accentColor={accentColor} hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Notes</h3>
        <NeonButton variant="ghost" size="icon" onClick={createNote}>
          <Plus className="w-4 h-4" />
        </NeonButton>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="pl-10 bg-white/5 border-white/10 text-white text-sm h-9"
        />
      </div>

      <div className="flex-grow flex gap-4 min-h-0">
        {/* Notes List */}
        <div className="w-1/3 overflow-y-auto space-y-2 pr-2">
          {filteredNotes.map(note => (
            <motion.div
              key={note.id}
              whileHover={{ x: 4 }}
              onClick={() => selectNote(note)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                activeNote?.id === note.id 
                  ? 'bg-white/10' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h4 className="font-medium text-white text-sm truncate">{note.title}</h4>
                  <p className="text-xs text-white/40 truncate mt-1">{note.content}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="p-1 text-white/30 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note Editor */}
        <div className="flex-grow flex flex-col min-h-0">
          {activeNote ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <Input
                  value={editContent.title}
                  onChange={(e) => setEditContent(prev => ({ ...prev, title: e.target.value }))}
                  onFocus={() => setIsEditing(true)}
                  className="bg-transparent border-none text-white font-medium p-0 h-auto"
                  placeholder="Note title..."
                />
                {isEditing && (
                  <NeonButton variant="ghost" size="sm" onClick={saveNote}>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </NeonButton>
                )}
              </div>
              <Textarea
                value={editContent.content}
                onChange={(e) => setEditContent(prev => ({ ...prev, content: e.target.value }))}
                onFocus={() => setIsEditing(true)}
                className="flex-grow bg-white/5 border-white/10 text-white text-sm resize-none"
                placeholder="Start typing..."
              />
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-white/40">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select or create a note</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}