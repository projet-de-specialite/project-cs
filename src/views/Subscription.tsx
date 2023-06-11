import {
	Button,
	Tab, TabList, TabPanel, TabPanels, Tabs, Text
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Base from "./Base";
import SubscriptionService from "../services/subscription";
export default function Subscription(props: any) {

	const navigate = useNavigate();
	const user = props.user
	const [subscriptions, setSubscriptions] = useState([]);
	const [subscribers, setSubscribers] = useState([]);

	useEffect(() => {
		if (user == null) {
			navigate("/login");
		}
		fetchSubscriptionData();
	},[navigate, user])

	const fetchSubscriptionData = async () => {
		setSubscriptions(await SubscriptionService.getSubscriptions(1));
		setSubscribers(await SubscriptionService.getSubscribers(1));
	}

	const unsubscribe = async (user_id:number) => {

		SubscriptionService.unsubscribe(user.id, user_id);
		fetchSubscriptionData()
	}

	return (
		<>
			<Base user={user}>
				{user !== "" &&
					<Tabs isFitted variant='enclosed'>
						<TabList mb='1em'>
							<Tab>Abonnements</Tab>
							<Tab>Abonnés</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								{
									subscriptions && subscriptions.map((subscription) =>
										<Text>
											{subscription["firstname"]} {subscription["lastname"]} <Button onClick={() => unsubscribe(subscription["user_id"])} colorScheme='red'>Se désabonner</Button>
										</Text>
									)
								}
							</TabPanel>
							<TabPanel>
								{
									subscribers && subscribers.map((subscriber) =>
										<Text>{subscriber["firstname"]} {subscriber["lastname"]}</Text>
									)
								}
							</TabPanel>
						</TabPanels>
					</Tabs>
				}
			</Base>

		</>
	);
}
