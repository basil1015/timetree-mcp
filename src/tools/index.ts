/**
 * Tool Registration
 * Exports all MCP tools for the TimeTree server.
 */

import type { TimeTreeAPIClient } from '../client/api.js';
import { createListCalendarsTool } from './calendar-tools.js';
import {
  createGetCalendarLabelsTool,
  createGetCalendarMembersTool,
  createGetCalendarVirtualMembersTool,
  // createUpdateCalendarLabelsTool, // 쓰기 기능 비활성화 (조회 전용)
} from './calendar-metadata-tools.js';
import {
  // createAddEventCommentTool, // 쓰기 기능 비활성화 (조회 전용)
  // createDeleteEventCommentTool, // 쓰기 기능 비활성화 (조회 전용)
  createListEventCommentsTool,
  // createUpdateEventCommentTool, // 쓰기 기능 비활성화 (조회 전용)
} from './comment-tools.js';
// 쓰기 기능 비활성화 (조회 전용): 이벤트 생성/수정/삭제 import 전체 주석 처리
// import {
//   createCreateEventTool,
//   createUpdateEventTool,
//   createDeleteEventTool,
// } from './event-crud-tools.js';
import { createGetEventsTool, createGetUpdatedEventsTool } from './event-tools.js';
import {
  // createCreateMemoTool, // 쓰기 기능 비활성화 (조회 전용)
  // createDeleteMemoTool, // 쓰기 기능 비활성화 (조회 전용)
  createListMemosTool,
  // createUpdateMemoTool, // 쓰기 기능 비활성화 (조회 전용)
} from './memo-tools.js';

export function registerTools(apiClient: TimeTreeAPIClient) {
  return [
    createListCalendarsTool(apiClient),
    createGetEventsTool(apiClient),
    createGetUpdatedEventsTool(apiClient),
    // 쓰기 기능 비활성화 (조회 전용)
    // createCreateEventTool(apiClient),
    // createUpdateEventTool(apiClient),
    // createDeleteEventTool(apiClient),
    createListMemosTool(apiClient),
    // createCreateMemoTool(apiClient),
    // createUpdateMemoTool(apiClient),
    // createDeleteMemoTool(apiClient),
    // createAddEventCommentTool(apiClient),
    createListEventCommentsTool(apiClient),
    // createUpdateEventCommentTool(apiClient),
    // createDeleteEventCommentTool(apiClient),
    createGetCalendarLabelsTool(apiClient),
    // createUpdateCalendarLabelsTool(apiClient),
    createGetCalendarMembersTool(apiClient),
    createGetCalendarVirtualMembersTool(apiClient),
  ];
}
