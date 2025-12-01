import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Car } from '@/entities/car/model/types'

interface AppState {
    favorites: string[]
    toggleFavorite: (carId: string) => void
    isFavorite: (carId: string) => boolean
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (carId) =>
                set((state) => ({
                    favorites: state.favorites.includes(carId)
                        ? state.favorites.filter((id) => id !== carId)
                        : [...state.favorites, carId],
                })),
            isFavorite: (carId) => get().favorites.includes(carId),
        }),
        {
            name: 'apex-storage',
        }
    )
)
