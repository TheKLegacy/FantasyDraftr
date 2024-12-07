import { atom } from 'jotai'
import { Board } from './Types'
import { initialBoard } from './InitialData'

export const currentBoard = atom<Board>(initialBoard);

export const currentBoardName = atom((get) => get(currentBoard).Name);

export const currentFilters = atom((get) => get(currentBoard).Filters);

export const currentPlayers = atom((get) => get(currentBoard).Players);

export const allBoards = atom<Board[]>([initialBoard])