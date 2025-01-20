import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const EventDetail = () => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={Colors.light.background}
    ></LinearGradient>
  );
};
export default EventDetail;
