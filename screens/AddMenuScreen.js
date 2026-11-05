import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { MenuContext } from "../context/MenuContext";
import { validateMenuItem } from "../utils/validation";

export default function AddMenuScreen() {
  const { addItem } = useContext(MenuContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starter");
  const [price, setPrice] = useState("");

  const handleAddItem = () => {
    const error = validateMenuItem(
      name,
      description,
      price
    );

    if (error) {
      Alert.alert("Error", error);
      return;
    }

    addItem({
      name,
      description,
      course,
      price,
    });

    Alert.alert(
      "Success",
      "Menu item added successfully"
    );

    setName("");
    setDescription("");
    setCourse("Starter");
    setPrice("");
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Add Menu Item
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) =>
            setCourse(itemValue)
          }
        >
          <Picker.Item
            label="Starter"
            value="Starter"
          />

          <Picker.Item
            label="Main Course"
            value="Main Course"
          />

          <Picker.Item
            label="Dessert"
            value="Dessert"
          />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddItem}
      >
        <Text style={styles.buttonText}>
          Add Menu Item
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});