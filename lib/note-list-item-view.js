"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SimpleNoteListItemView;
exports.registerAsNoteListItemView = registerAsNoteListItemView;
exports.unregisterAsNoteListItemView = unregisterAsNoteListItemView;

var React = _interopRequireWildcard(require("react"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dayjs.default.extend(_relativeTime.default);

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
  const date = (0, _dayjs.default)(updatedAt).fromNow(true);
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
  return /*#__PURE__*/React.createElement("div", {
    className: `${classes} ${taskState}`,
    onClick: handleClick,
    onContextMenu: handleContextMenu,
    onDoubleClick: handleDblClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement(NoteStatusIcon, {
    status: status
  }), /*#__PURE__*/React.createElement(NoteListItemShareStatusView, {
    visibility: share
  }), title || 'Untitled'), /*#__PURE__*/React.createElement("div", {
    className: "description"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, date), isTask && /*#__PURE__*/React.createElement(TaskProgressView, {
    numOfTasks: numOfTasks || 0,
    numOfCheckedTasks: numOfCheckedTasks || 0
  }), /*#__PURE__*/React.createElement(TagList, {
    tagIds: tags
  })))));
}

function registerAsNoteListItemView() {
  inkdrop.components.registerClass(SimpleNoteListItemView, 'CustomNoteListItemView');
}

function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(SimpleNoteListItemView.default, 'CustomNoteListItemView');
}