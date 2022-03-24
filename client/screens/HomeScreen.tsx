import {
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavOptions from "../components/NavOptions";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
	const [search, setSearch] = useState("");

	return (
		<ImageBackground
			source={require("../assets/background.png")}
			resizeMode="cover"
			style={styles.image2}
		>
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={require("../assets/google_logo.png")}
					/>
					<View style={styles.container2}>
						<TextInput
							placeholder="Search or type web address"
							activeUnderlineColor="black"
							left={<TextInput.Icon name="magnify" />}
							right={<TextInput.Icon name="" />}
							autoComplete
							onChangeText={(text: string) => setSearch(text)}
							style={{
								borderTopRightRadius: 20,
								borderTopLeftRadius: 20,
								borderBottomRightRadius: 20,
								borderBottomLeftRadius: 20,
								borderStyle: "solid",
								backgroundColor: "#FFFFFF",
								width: 330,
								height: 42.5,
								flex:0,
								alignContent: "center",
								textAlign: "auto",
								marginBottom: 2,
							}}
						/>
					</View>
					<NavOptions term={search} />
					<Text>hey</Text>
				</View>
				<StatusBar style="light" />
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container2: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		top: 80,
	},
	image2: {
		flex: 1,
		justifyContent: "center",
	},
	image: {
		flex: 1,
		width: 200,
		height: 200,
		resizeMode: "contain",
		top: 180,
	},
	searchInput: {
		width: 300,
		height: 40,
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 15,
		fontSize: 16,
		flex:1
	},
});

export default HomeScreen;
