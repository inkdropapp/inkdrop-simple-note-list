import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'

dayjs.extend(relativeTime)

export default function SimpleNoteListItemView(props) {
  const StreamlineIcon = inkdrop.components.getComponentClass('StreamlineIcon')
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon')
  const HighlightedText =
    inkdrop.components.getComponentClass('HighlightedText')
  const NoteListItemSummaryView = inkdrop.components.getComponentClass(
    'NoteListItemSummaryView'
  )
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass(
    'NoteListItemShareStatusView'
  )
  const TaskProgressView =
    inkdrop.components.getComponentClass('TaskProgressView')
  const TagList = inkdrop.components.getComponentClass('TagList')

  const {
    listSortKey,
    active,
    focused,
    note,
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
  const ftsData = note._fts

  const classes = classNames({
    'simple-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
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
    e => {
      onClick && onClick(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onClick, note]
  )
  const handleDblClick = useCallback(
    e => {
      onDblClick && onDblClick(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onDblClick, note]
  )
  const handleMouseDown = useCallback(
    e => {
      if (e.button === 1) {
        onMiddleClick && onMiddleClick(e, note)
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [onMiddleClick, note]
  )
  const handleContextMenu = useCallback(
    e => {
      onContextMenu && onContextMenu(e, note)
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
            <StreamlineIcon
              name="warning-bold"
              className="note-conflicted-icon inline"
            />
          )}
          {pinned && (
            <StreamlineIcon name="pin-bold" className="note-pin-icon inline" />
          )}
          <NoteStatusIcon status={status} />
          <NoteListItemShareStatusView visibility={share} />
          {ftsData ? (
            <HighlightedText highlights={ftsData.titleHighlights}>
              {title}
            </HighlightedText>
          ) : (
            title
          )}
        </div>
        <div className="description">
          <div className="meta">
            <span className="date">{date}</span>
            {isTask && (
              <TaskProgressView
                numOfTasks={numOfTasks || 0}
                numOfCheckedTasks={numOfCheckedTasks || 0}
              />
            )}
            <TagList tagIds={tags} onClickItem={onTagListItemClick} />
          </div>
          {ftsData && (
            <NoteListItemSummaryView
              revId={_rev || ''}
              body={body}
              highlights={ftsData?.bodyHighlights}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function registerAsNoteListItemView() {
  inkdrop.components.registerClass(
    SimpleNoteListItemView,
    'CustomNoteListItemView'
  )
}

export function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(
    SimpleNoteListItemView.default,
    'CustomNoteListItemView'
  )
}
