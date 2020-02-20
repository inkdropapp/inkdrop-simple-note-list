import * as SimpleNoteListItemView from './note-list-item-view';

module.exports = {
  activate() {
    SimpleNoteListItemView.registerAsNoteListItemView()
  },

  deactivate() {
    SimpleNoteListItemView.unregisterAsNoteListItemView()
  }
};
