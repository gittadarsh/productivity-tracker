import useInitializeProductivity from "./hooks/useInitializeProductivity";

export default function AppInitializer({

  children,

}) {

  useInitializeProductivity();

  return children;
}