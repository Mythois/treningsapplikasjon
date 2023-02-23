import { RouteProp } from "@react-navigation/native";
import { WorkoutUser } from "./LocalData/Users/WorkoutUser";

export type RootStackParamList = {
    Home: undefined;
    FriendProfileScreen: { user: WorkoutUser };
  };
  
  type FriendProfileScreenRouteProp = RouteProp<RootStackParamList, 'FriendProfileScreen'>;
  