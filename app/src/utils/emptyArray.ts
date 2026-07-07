import type { Photo } from '../types';

/** Stable empty-array reference for Zustand selector fallbacks (avoids re-render loops). */
export const EMPTY_PHOTOS: Photo[] = [];
