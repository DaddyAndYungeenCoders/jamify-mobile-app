import { ImageSourcePropType } from "react-native";

export default interface OrbitIconType {
  image: ImageSourcePropType;
  initialAngle: number;
}

export default interface OrbitAnimationProps {
  innerOrbitalIcons: OrbitIconType[];
  outerOrbitalIcons: OrbitIconType[];
  innerOrbitRadius?: number;
  outerOrbitRadius?: number;
  iconSize?: number;
  ringWidth?: number;
  animationDuration?: number;
  outerTimingMultiplier?: number;
}
