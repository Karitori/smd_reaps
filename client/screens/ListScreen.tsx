import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { useEffect, useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Image,
	FlatList,
	ImageBackground,
} from "react-native";
import { Text, Card } from "react-native-elements";
import Carousel, {
	ParallaxImage,
	Pagination,
} from "react-native-snap-carousel";

const Item2 = ({ name, image, addressFmt }) => {
	const [Index, setIndex] = useState(0);
	return (
		<View style={{ padding: 15 }}>
			<Card
				containerStyle={{
					backgroundColor: "#242424",
					borderColor: "gray",
					borderRadius: 20,
				}}
			>
				<Card.Title adjustsFontSizeToFit style={{ color: "white" }}>
					{name}
				</Card.Title>
				<Card.Divider color="white" />
				<Carousel
					layout="default"
					data={image}
					renderItem={renderItem2}
					itemWidth={300}
					itemHeight={100}
					sliderWidth={300}
					onSnapToItem={(index) => setIndex(index)}
				/>

				<Pagination
					activeDotIndex={Index}
					dotsLength={image.length}
					dotColor={"#ea4335"}
					inactiveDotColor={"gray"}
					inactiveDotOpacity={1}
					containerStyle={{margin:-20}}
					
				/>
				<Card.Divider color="white" />
				<Text style={{ marginBottom: 10, color: "white" }}>
					Address: {addressFmt}
				</Text>
			</Card>
		</View>
	);
};
const renderItem2 = ({ item, index }) => {
	return (
		<View style={styles.container}>
			<Image
				style={{ resizeMode: "contain", width: 300, height: 250 }}
				source={
					item
						? {
								uri: item,
						  }
						: require("../assets/NotFound.jpg")
				}
			></Image>
		</View>
	);
};
const ListScreen = () => {
	const route = useRoute<RouteProps>();
	const { term } = route.params;
	const [universities, setUniversity] = useState<University[]>();

	useEffect(() => {
		Promise.all([
			axios.default.get(`http://192.168.2.244:3000/universities/${term}`),
		]).then(([{ data: universitiesResults }]) => {
			if (universitiesResults) setUniversity(universitiesResults);
		});
	}, []);

	const renderItem = ({ item }) => (
		<Item2 name={item.name} image={item.image} addressFmt={item.addressFmt} />
	);

	return (
		<ImageBackground
			source={require("../assets/background.png")}
			resizeMode="cover"
			style={styles.image2}
		>
			<View style={styles.container}>
				<FlatList
					data={universities}
					renderItem={renderItem}
					keyExtractor={(item) => item.name}
				/>
			</View>
		</ImageBackground>
	);

	type RouteProps = {
		params: RouteParams;
		name: string;
		key: string;
	};
	type University = {
		name: string;
		lat: number;
		lng: number;
		addressFmt: string;
		image: Array<string>;
	};
	type RouteParams = {
		term: string;
	};
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image2: {
		flex: 1,
		justifyContent: "center",
	},
	fonts: {
		marginBottom: 8,
	},
	user: {
		flexDirection: "row",
		marginBottom: 6,
	},
	image: {
		width: 30,
		height: 30,
		marginRight: 10,
	},
	name: {
		fontSize: 16,
		marginTop: 5,
	},
});

export default ListScreen;
