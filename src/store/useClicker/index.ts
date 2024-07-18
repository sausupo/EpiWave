import { create } from "zustand";
import { ENERGY_DECREMENT, ENERGY_INCREMENT, ENERGY_MAX, INCREMENT_VALUE } from "../../shared/config";
import axios from "axios";

type Store = {
    clickable: boolean;
    isLoading: boolean;
    energy: number;
    count: number;
}

type Actions = {
    init: () => void;
    increment: () => void;
    energyIncrement: () => void;
    energyDecrement: () => void;
}

const useClicker = create<Store & Actions>((set) => ({
    clickable: false,
    isLoading: false,
    energy: 1450,
    count: 0,
    init: async() => {
        const {data} = await axios.post('http://localhost:3000/users/getUser', {
            userId: 123,
          });
        const [result] = data;
        set({
            count: result.coinsAmount ? Number(result.coinsAmount) : 5000,
            energy: result.energy ? Number(result.energy) : 1500,
            isLoading: false,
        })
        // WebApp.CloudStorage.getItems(["count", "energy"], (error, result) => {
        //     if (!error && result) {
        //         set({
        //             count: result.count ? Number(result.count) : 5000,
        //             energy: result.energy ? Number(result.energy) : 1500,
        //             isLoading: false,
        //         })
        //     } else {
        //         set({
        //             isLoading: false,
        //         })
        //     };
        // });
    },
    increment: () => {
        set((state) => ({
            count: state.count + INCREMENT_VALUE,
        }))
    },
    energyIncrement: () => {
        set((state) => {
            if (state.energy < ENERGY_MAX - ENERGY_INCREMENT) {
                return { energy: state.energy + ENERGY_INCREMENT };
              } else {
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