import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Custom hook useAppDispatch đã gõ kiểu (Typed Dispatch)
 * Sử dụng thay thế hoàn toàn cho useDispatch gốc trong toàn bộ components
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Custom hook useAppSelector đã gõ kiểu (Typed Selector)
 * Sử dụng thay thế hoàn toàn cho useSelector gốc trong toàn bộ components
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
