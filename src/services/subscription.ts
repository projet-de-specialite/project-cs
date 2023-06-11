import axios from "axios";

const API_URL = process.env.REACT_APP_SUBSCRIPTION_URL;

class SubscriptionService {

	create(user_id:number, follower_id:number) {
		axios.post(API_URL + "", {
			user_id,
			follower_id
		});
		return true;
	}

	getSubscriptions(user_id: number) {

		return axios.get(API_URL + "subscription/getAllSubscriptions/" + user_id).then((response) => response.data);
	}

	getSubscribers(follower_id: number) {
		return axios.get(API_URL + "subscription/getAllSubscribers/" + follower_id).then((response) => response.data);
	}
	unsubscribe(follower_id:number, user_id:number){
		return axios.delete(API_URL + "/?follower_id=" + follower_id + "&user_id=" + user_id);
	}
}

export default new SubscriptionService();

