"use strict";
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SimpleNoteListItemView;
exports.registerAsNoteListItemView = registerAsNoteListItemView;
exports.unregisterAsNoteListItemView = unregisterAsNoteListItemView;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function SimpleNoteListItemView(props) {
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon');
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass('NoteListItemShareStatusView');
  const TaskProgressView = inkdrop.components.getComponentClass('TaskProgressView');
  const TagList = inkdrop.components.getComponentClass('TagList');
  const {
    active,
    focused,
    note,
    onClick,
    onDblClick,
    onContextMenu
  } = props;
  const {
    title,
    status,
    body,
    updatedAt,
    share,
    numOfTasks,
    numOfCheckedTasks,
    tags
  } = note;
  const classes = (0, _classnames.default)({
    'simple-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    task: status !== 'none'
  });
  const date = (0, _moment.default)(updatedAt).fromNow(true);
  const taskState = status ? `task-${status}` : '';
  const isTask = typeof numOfTasks === 'number' && numOfTasks > 0;
  const handleClick = (0, React.useCallback)(e => {
    onClick && onClick(e, note);
    e.preventDefault();
    e.stopPropagation();
  }, [onClick, note]);
  const handleDblClick = (0, React.useCallback)(e => {
    onDblClick && onDblClick(e, note);
    e.preventDefault();
    e.stopPropagation();
  }, [onDblClick, note]);
  const handleContextMenu = (0, React.useCallback)(e => {
    onContextMenu && onContextMenu(e, note);
    e.preventDefault();
    e.stopPropagation();
  }, [onContextMenu, note]);
  return React.createElement("div", {
    className: `${classes} ${taskState}`,
    onClick: handleClick,
    onContextMenu: handleContextMenu,
    onDoubleClick: handleDblClick
  }, React.createElement("div", {
    className: "content"
  }, React.createElement("div", {
    className: "header"
  }, React.createElement(NoteStatusIcon, {
    status: status
  }), React.createElement(NoteListItemShareStatusView, {
    visibility: share
  }), title || 'Untitled'), React.createElement("div", {
    className: "description"
  }, React.createElement("div", {
    className: "meta"
  }, React.createElement("span", {
    className: "date"
  }, date), isTask && React.createElement(TaskProgressView, {
    numOfTasks: numOfTasks || 0,
    numOfCheckedTasks: numOfCheckedTasks || 0
  }), React.createElement(TagList, {
    tagIds: tags
  })))));
}

SimpleNoteListItemView.propTypes = {
  active: _propTypes.default.bool,
  focused: _propTypes.default.bool,
  note: _propTypes.default.object,
  onClick: _propTypes.default.func,
  onDblClick: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
};

function registerAsNoteListItemView() {
  inkdrop.components.registerClass(SimpleNoteListItemView, 'CustomNoteListItemView');
}

function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(SimpleNoteListItemView.default, 'CustomNoteListItemView');
}