import axios from "axios";

const API_URL = process.env.REACT_APP_POST_URL;

class PostService {

  create(file: string, caption: string, tags: string[], published: boolean, owner_id: number) {
    axios.post(API_URL + "posts/new", {
      file,
      caption,
      tags,
      published,
      owner_id
    });
    return true;
  }

  getFeedPosts(owners_id: number[]) {

    let usersString = "";

    for(let i= 0; i<owners_id.length; i++){
      usersString += "owners="+ owners_id[i] + "&";
    }
    usersString += "limit=100"

    return axios.get(API_URL + "posts/?" + usersString).then((response) => response.data);
  }

  getUserPosts(owner_id: number) {
    return axios.get(API_URL + "posts/?owners=" + owner_id).then((response) => response.data);
  }
}

export default new PostService();

