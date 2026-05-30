import {
  useProductivityStore,
} from "../store/useProductivityStore";

import {
  selectCoreStats,
} from "../store/selectors";

export default function useCoreProductivity() {

  return useProductivityStore(
    selectCoreStats
  );
}