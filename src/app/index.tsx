import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState("All");

  const [menuItems, setMenuItems] = useState<any[]>([]);

  const addMenuItem = () => {
    if (!name || !description || !course || !price) {
      Alert.alert("Error", "Please complete all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      description,
      course,
      price,
    };

    setMenuItems([...menuItems, newItem]);

    Alert.alert(
      "Success",
      "Menu item added successfully"
    );

    setName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  const deleteMenuItem = (id: number) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMenuItems(
              menuItems.filter(
                (item) => item.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const editMenuItem = (item: any) => {
    setName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);

    setMenuItems(
      menuItems.filter(
        (menuItem) => menuItem.id !== item.id
      )
    );

    Alert.alert(
      "Edit Mode",
      "Update the information and press Add Menu Item"
    );
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCourse =
      selectedCourse === "All"
        ? true
        : item.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  const totalItems = menuItems.length;

  const averagePrice =
    menuItems.length > 0
      ? (
          menuItems.reduce(
            (sum, item) =>
              sum + Number(item.price),
            0
          ) / menuItems.length
        ).toFixed(2)
      : "0.00";

  const starters = menuItems.filter(
    (item) => item.course === "Starter"
  ).length;

  const mains = menuItems.filter(
    (item) => item.course === "Main Course"
  ).length;

  const desserts = menuItems.filter(
    (item) => item.course === "Dessert"
  ).length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Chef's Menu Manager
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

      <TextInput
        style={styles.input}
        placeholder="Course (Starter/Main Course/Dessert)"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addMenuItem}
      >
        <Text style={styles.buttonText}>
          Add Menu Item
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Search menu item..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedCourse("All")}
        >
          <Text style={styles.filterText}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setSelectedCourse("Starter")
          }
        >
          <Text style={styles.filterText}>
            Starter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setSelectedCourse(
              "Main Course"
            )
          }
        >
          <Text style={styles.filterText}>
            Main
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setSelectedCourse("Dessert")
          }
        >
          <Text style={styles.filterText}>
            Dessert
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Statistics
      </Text>

      <View style={styles.statisticsCard}>
        <Text>
          Total Items: {totalItems}
        </Text>

        <Text>
          Average Price: R{averagePrice}
        </Text>

        <Text>
          Starters: {starters}
        </Text>

        <Text>
          Main Courses: {mains}
        </Text>

        <Text>
          Desserts: {desserts}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Menu Items
      </Text>

      {filteredItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.itemName}>
            {item.name}
          </Text>

          <Text>
            Description: {item.description}
          </Text>

          <Text>
            Course: {item.course}
          </Text>

          <Text>
            Price: R{item.price}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                editMenuItem(item)
              }
            >
              <Text style={styles.actionText}>
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteMenuItem(item.id)
              }
            >
              <Text style={styles.actionText}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2E7D32",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  filterButton: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  filterText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  statisticsCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },

  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#FFA000",
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },

  actionText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});