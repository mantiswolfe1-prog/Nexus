/**
 * Message Entity
 * Stores chat messages with real-time sync via localStorage polling
 */

export class Message {
  constructor(data = {}) {
    this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
    this.channelId = data.channelId || 'general'; // channel or 'dm-{userId1}-{userId2}'
    this.userId = data.userId; // sender ID
    this.username = data.username; // sender display name
    this.avatar = data.avatar || null; // sender avatar URL
    this.content = data.content; // message text
    this.attachments = data.attachments || []; // array of file URLs
    this.reactions = data.reactions || {}; // { emoji: [userId1, userId2] }
    this.replyTo = data.replyTo || null; // message ID being replied to
    this.edited = data.edited || false;
    this.editedAt = data.editedAt || null;
    this.deleted = data.deleted || false;
    this.timestamp = data.timestamp || Date.now();
    this.type = data.type || 'message'; // 'message', 'system', 'join', 'leave'
  }

  toJSON() {
    return {
      id: this.id,
      channelId: this.channelId,
      userId: this.userId,
      username: this.username,
      avatar: this.avatar,
      content: this.content,
      attachments: this.attachments,
      reactions: this.reactions,
      replyTo: this.replyTo,
      edited: this.edited,
      editedAt: this.editedAt,
      deleted: this.deleted,
      timestamp: this.timestamp,
      type: this.type
    };
  }

  static fromJSON(json) {
    return new Message(json);
  }
}

export class Channel {
  constructor(data = {}) {
    this.id = data.id || Date.now().toString(36);
    this.name = data.name;
    this.description = data.description || '';
    this.type = data.type || 'text'; // 'text', 'voice', 'dm'
    this.icon = data.icon || '💬';
    this.private = data.private || false;
    this.allowedUsers = data.allowedUsers || []; // for private channels
    this.createdAt = data.createdAt || Date.now();
    this.lastActivity = data.lastActivity || Date.now();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      icon: this.icon,
      private: this.private,
      allowedUsers: this.allowedUsers,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity
    };
  }

  static fromJSON(json) {
    return new Channel(json);
  }
}
