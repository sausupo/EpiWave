import { create } from "zustand";
import { API, ENERGY_DECREMENT, ENERGY_INCREMENT, ENERGY_MAX, INCREMENT_VALUE } from "../../shared/config";
import WebApp from "@twa-dev/sdk";
import axios from "axios";

type Store = {
    clickable: boolean;
    isLoading: boolean;
    energy: number;
    count: number;
    coinsPerTapAmount: number;
}

type Actions = {
    init: () => void;
    increment: () => void;
    energyIncrement: () => void;
    energyDecrement: () => void;
    setCoinsPerTapAmount: (val: number) => void;
}

const useClicker = create<Store & Actions>((set) => ({
    clickable: false,
    isLoading: false,
    energy: 1450,
    count: 0,
    coinsPerTapAmount: 0, 
    init: async() => {
        const userId = WebApp.initDataUnsafe.user?.id;

        const {data} = await axios.post(`${API}/users/getUser`, {
            userId,
          });
        const [result] = data;

        set({
            count: result.coinsAmount ? Number(result.coinsAmount) : 5000,
            energy: result.energy ? Number(result.energy) : 1500,
            coinsPerTapAmount: result.coinsPerTapAmount ? Number(result.coinsPerTapAmount) : INCREMENT_VALUE,
            isLoading: false,
        })
    },
    increment: () => {
        set((state) => ({
            count: state.count + state.coinsPerTapAmount,
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
    setCoinsPerTapAmount: (val) => {
        set(() => ({
            coinsPerTapAmount: val
        }))
    }
}))

export default useClicker;