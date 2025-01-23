import { UpdateOptimisticProjects } from '@/components/ProjectList'
import { create } from 'zustand'

type StoreTypes = {
  showSkeletonList: boolean
  setShowSkeletonList: (b: boolean)=>void

  updateProjects: null | UpdateOptimisticProjects
  setUpdateProjects: (funk: UpdateOptimisticProjects) => void
}

export const useAppStore = create<StoreTypes>()((set) => ({
  showSkeletonList: false,
  setShowSkeletonList: (b)=>set({ showSkeletonList: b }),
  updateProjects: null,
  setUpdateProjects: (funk)=>set({ updateProjects: funk})
}))




