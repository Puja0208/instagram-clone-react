import { useContext, useState, useEffect } from "react";
import { getUserByUserId, getUserFollowedPhotos } from "../services/firebase";
import UserContext from "../context/user";
export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (followingUserIds && followingUserIds[0].following.length > 0) {
        followedUserPhotos = await getUserFollowedPhotos(
          userId,
          followingUserIds[0].following
        );

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}

// Challenge: Implementing the getUserFollowPhotos service function

// AC:
//      - Create a const called 'photosWithUserDetails' and use 'await Promise.all' to async map over the function 'getUserByUserId' - inside the map we will be going over the array 'userFollowedPhotos', and we want to make this map 'async'
//      - Within the map, create a let called 'userLikedPhoto' and assign this to false, once you have done that, check if 'photo.likes.includes' the 'userId' that is passed into the 'getUserFollowedPhotos' function. If it is true, change the 'userLikedPhoto' to true
//      - After this, create a new const called 'user' and await the response from 'getUserByUserId', we need to pass in the 'photo.userId' here to get the username of the response, so an example would be 'const username = user[0].username'
//      - return inside the map the username, all the photo properties (spread the result of photo), and lastly userLikedPhoto
//      - To end this function return 'photosWithUserDetails'
//      - Once you have done that, go to the Timeline and where we are mapping 'I am a photo!', replace it with 'content.username' to see that we get back the username of the photos that we got back from the service call (tip: use the docId on the photos.map for the key!)
