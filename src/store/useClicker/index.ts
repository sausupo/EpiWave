import { create } from "zustand";
import { ENERGY_DECREMENT, ENERGY_INCREMENT, ENERGY_MAX, INCREMENT_VALUE } from "../../shared/config";
import WebApp from "@twa-dev/sdk";

type Store = {
    clickable: boolean;
    isLoading: boolean;
    energy: number;
    count: number;
}

type Actions = {
    init: () => void;
    increment: () => void;
    energyIncrement: (intervalId: number) => void;
    energyDecrement: () => void;
}

const useClicker = create<Store & Actions>((set) => ({
    clickable: false,
    isLoading: false,
    energy: 1450,
    count: 0,
    init: () => {
        WebApp.CloudStorage.getItems(["count", "energy"], (error, result) => {
            debugger;
            if (!error && result) {
                set({
                    count: Number(result.count) || 5000,
                    energy: Number(result.energy) || 1500,
                    isLoading: false,
                })
            } else {
                set({
                    isLoading: false,
                })
            };
        });
    },
    increment: () => {
        set((state) => ({
            count: state.count + INCREMENT_VALUE,
        }))
    },
    energyIncrement: (intervalId) => {
        set((state) => {
            if (state.energy < ENERGY_MAX - ENERGY_INCREMENT) {
                return { energy: state.energy + ENERGY_INCREMENT };
              } else {
                clearInterval(intervalId); // Останавливаем интервал, если count достиг 100
                return {energy: ENERGY_MAX};
              }
        })
    },
    energyDecrement: () => {
        set((state) => ({
            energy: state.energy - ENERGY_DECREMENT,
        }))
    },
}))

export default useClicker;