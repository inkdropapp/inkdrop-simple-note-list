import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'

dayjs.extend(relativeTime)

export default function SimpleNoteListItemView(props) {
  const StreamlineIcon = inkdrop.components.getComponentClass('StreamlineIcon')
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon')
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass(
    'NoteListItemShareStatusView'
  )
  const TaskProgressView =
    inkdrop.components.getComponentClass('TaskProgressView')
  const TagList = inkdrop.components.getComponentClass('TagList')

  const {
    active,
    focused,
    note,
    onClick,
    onDblClick,
    onContextMenu,
    onMiddleClick
  } = props
  const {
    title,
    status,
    updatedAt,
    share,
    numOfTasks,
    numOfCheckedTasks,
    tags,
    pinned,
    _conflicts
  } = note
  const classes = classNames({
    'simple-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    task: status !== 'none'
  })
  const fmt = dayjs(updatedAt)
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
            <StreamlineIcon name="warning-bold" className="inline" />
          )}
          {pinned && (
            <StreamlineIcon
              name="pin-bold"
              className="inline"
              color="var(--primary-color)"
            />
          )}
          <NoteStatusIcon status={status} />
          <NoteListItemShareStatusView visibility={share} />
          {title || 'Untitled'}
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
            <TagList tagIds={tags} />
          </div>
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
