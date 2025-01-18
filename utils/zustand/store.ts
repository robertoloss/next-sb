import { create } from 'zustand'

type StoreTypes = {
  showSkeletonList: boolean
  setShowSkeletonList: (b: boolean)=>void
}

export const useAppStore = create<StoreTypes>()((set) => ({
  showSkeletonList: false,
  setShowSkeletonList: (b)=>set({ showSkeletonList: b })
}))




