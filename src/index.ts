import type { IInkdropPlugin } from '@inkdropapp/types'

import { registerAsNoteListItemView, unregisterAsNoteListItemView } from './note-list-item-view'

class SimpleNoteListPlugin implements IInkdropPlugin {
  activate() {
    registerAsNoteListItemView()
  }

  deactivate() {
    unregisterAsNoteListItemView()
  }
}

export default new SimpleNoteListPlugin()
