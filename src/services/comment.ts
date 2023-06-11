import axios from "axios";

const API_URL = process.env.REACT_APP_POST_URL;

class CommentService {

  create(id_user: number, content: string, id_post: number) {
    return axios.post(API_URL + "newComment", {
      id_user,
      content,
      id_post
    });
  }

  getOfPost(id_post: number) {
    return axios.get(API_URL + "printComment/" + id_post);
  }

  delete(id_comment: number){
    return axios.delete(API_URL + "deleteComment/" + id_comment);
  }

}

export default new CommentService();

