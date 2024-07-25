import { StyleSheet, Text, View } from "react-native";
import DashboardComponent from "./coponents/dashboard";
import AddCategoryComponent from "./coponents/add_category";
import AddTaskComponent from "./coponents/add_task";
import AllTaskComponent from "./coponents/all_task_component";
import TaskDetailComponent from "./coponents/task_detail_component";
import AllCategoryComponent from "./coponents/all_category_component";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardComponent} />
        <Stack.Screen name="Add Category" component={AddCategoryComponent} />
        <Stack.Screen name="Add Task" component={AddTaskComponent} />
        <Stack.Screen name="All Category" component={AllCategoryComponent} />
        <Stack.Screen name="All Task" component={AllTaskComponent} />
        <Stack.Screen name="Task Detail" component={TaskDetailComponent} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
