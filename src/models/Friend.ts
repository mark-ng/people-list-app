import { FriendLocation } from "./FriendLocation";
import { FriendName } from "./FriendName";

export interface Friend {
  _id: string;
  name: FriendName;
  email: string;
  picture: string;
  location: FriendLocation;
}
