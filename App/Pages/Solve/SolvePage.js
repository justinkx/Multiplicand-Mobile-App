import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import EmptyStates from "../../Components/EmptyStates";

const SolvePage = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <EmptyStates
        lottie={require("../../Assets/Lottie/under-development.json")}
      />
    </SafeAreaView>
  );
};

export default SolvePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
