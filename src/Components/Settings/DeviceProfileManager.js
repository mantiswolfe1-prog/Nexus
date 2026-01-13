import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import NeonButton from '../UI/NeonButton';
import { Input } from '../UI/input';

export default function DeviceProfileManager({ profiles, activeProfile, onSwitch, onCreate, onDelete }) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (newName.trim()) {
      onCreate(newName.trim());
      setNewName('');
      setCreating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profiles.map(profile => (
          <div
            key={profile.id}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              activeProfile === profile.id
                ? 'bg-cyan-500/10 border-cyan-400'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
            onClick={() => onSwitch(profile.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{profile.name}</h4>
                <p className="text-white/40 text-xs">{profile.device}</p>
              </div>
              <div className="flex items-center gap-2">
                {activeProfile === profile.id && (
                  <Check className="w-4 h-4 text-cyan-400" />
                )}
                {profile.id !== 'default' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(profile.id);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {creating ? (
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Profile name (e.g., Chromebook)"
            className="bg-white/5 border-white/10 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <NeonButton onClick={handleCreate}>Create</NeonButton>
          <NeonButton variant="ghost" onClick={() => setCreating(false)}>Cancel</NeonButton>
        </div>
      ) : (
        <NeonButton variant="ghost" onClick={() => setCreating(true)} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Create New Profile
        </NeonButton>
      )}
    </div>
  );
}