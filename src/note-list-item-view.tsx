import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { NoteSearchHighlights } from '@inkdropapp/types'
import type { Note, TemplateBookId } from 'inkdrop-model'
import type React from 'react'
import { useCallback } from 'react'

dayjs.extend(relativeTime)

const TEMPLATE_BOOK_ID: TemplateBookId = 'template'

interface SimpleNoteListItemViewProps {
  listSortKey: string
  note: Note
  /** Where a keyword search matched the note's title and body */
  highlights?: NoteSearchHighlights
  focused: boolean
  active: boolean
  onClick?: (e: React.MouseEvent, note: Note) => void
  onMiddleClick?: (e: React.MouseEvent, note: Note) => void
  onDblClick?: (e: React.MouseEvent, note: Note) => void
  onContextMenu?: (e: React.MouseEvent, note: Note) => void
  onTagListItemClick?: (e: React.MouseEvent, tagId: string) => void
}

export default function SimpleNoteListItemView(props: SimpleNoteListItemViewProps) {
  const StreamlineIcon = inkdrop.components.getComponentClass('StreamlineIcon')!
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon')!
  const HighlightedText = inkdrop.components.getComponentClass('HighlightedText')!
  const NoteListItemSummaryView = inkdrop.components.getComponentClass('NoteListItemSummaryView')!
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass(
    'NoteListItemShareStatusView'
  )!
  const TaskProgressView = inkdrop.components.getComponentClass('TaskProgressView')!
  const TagList = inkdrop.components.getComponentClass('TagList')!

  const {
    listSortKey,
    active,
    focused,
    note,
    highlights,
    onClick,
    onDblClick,
    onContextMenu,
    onMiddleClick,
    onTagListItemClick
  } = props
  const {
    _rev,
    title = 'Untitled',
    body,
    bookId,
    status,
    updatedAt,
    createdAt,
    share,
    numOfTasks,
    numOfCheckedTasks,
    tags,
    pinned,
    _conflicts
  } = note
  const isTemplate = bookId === TEMPLATE_BOOK_ID

  const classes = classNames({
    'simple-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    'is-template': isTemplate,
    'is-official-template': isTemplate && !_rev,
    task: status !== 'none'
  })
  const timestamp = listSortKey === 'createdAt' ? createdAt : updatedAt
  const fmt = dayjs(timestamp)
  const date =
    updatedAt >= +new Date() - 1000 * 60 * 60 * 24 * 37
      ? fmt.fromNow(true)
      : fmt.format('YYYY-MM-DD')
  const taskState = status ? `task-${status}` : ''
  const isTask = typeof numOfTasks === 'number' && numOfTasks > 0

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onClick, note]
  )
  const handleDblClick = useCallback(
    (e: React.MouseEvent) => {
      onDblClick?.(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onDblClick, note]
  )
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1) {
        onMiddleClick?.(e, note)
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [onMiddleClick, note]
  )
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      onContextMenu?.(e, note)
      e.preventDefault()
    },
    [onContextMenu, note]
  )

  return (
    <div
      className={`${classes} ${taskState}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDblClick}
      onMouseDown={handleMouseDown}
    >
      <div className="content">
        <div className="header">
          {_conflicts && (
            <StreamlineIcon name="warning-bold" className="note-conflicted-icon inline" />
          )}
          {pinned && <StreamlineIcon name="pin-bold" className="note-pin-icon inline" />}
          <NoteStatusIcon status={status} />
          <NoteListItemShareStatusView visibility={share} />
          {highlights ? (
            <HighlightedText highlights={highlights.titleHighlights}>{title}</HighlightedText>
          ) : (
            title
          )}
        </div>
        <div className="description">
          <div className="meta">
            {!isTemplate && <span className="date">{date}</span>}
            {isTask && (
              <TaskProgressView
                numOfTasks={numOfTasks || 0}
                numOfCheckedTasks={numOfCheckedTasks || 0}
              />
            )}
            <TagList tagIds={tags} onClickItem={onTagListItemClick} />
          </div>
          {highlights && (
            <NoteListItemSummaryView
              revId={_rev || ''}
              body={body}
              highlights={highlights.bodyHighlights}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function registerAsNoteListItemView() {
  inkdrop.components.registerClass(
    SimpleNoteListItemView as React.ComponentType,
    'CustomNoteListItemView'
  )
}

export function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(
    SimpleNoteListItemView as React.ComponentType,
    'CustomNoteListItemView'
  )
}
