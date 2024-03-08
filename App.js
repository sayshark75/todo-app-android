import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const TodoItem = ({ item, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const handleUpdate = () => {
    onUpdate(item.id, editText);
    setEdit(!edit);
  };
  const handleChange = (newText) => {
    setEditText(newText);
  };
  useEffect(() => {
    setEditText(item.text);
  }, []);
  return (
    <View style={styles.todoItem}>
      {edit ? (
        <View style={styles.editContainer}>
          <TextInput value={editText} style={styles.editInput} onChangeText={handleChange} />
          <Button title={"update"} onPress={handleUpdate} style={styles.addButton}></Button>
        </View>
      ) : (
        <Text onPress={() => setEdit(!edit)} style={styles.todoTitle}>
          {item.text}
        </Text>
      )}
      <Button onPress={() => onDelete(item.id)} title={"Delete"}></Button>
    </View>
  );
};

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <View style={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </View>
  );
};

const TodoInput = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleInputChange = (newText) => {
    setText(newText);
  };

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} onChangeText={handleInputChange} value={text} placeholder="Enter todo..." />
      <Button onPress={handleSubmit} style={styles.addButton} title={"Add"}></Button>
    </View>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TodoInput onSubmit={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "skyblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  todoList: {
    width: "100%",
    gap: 6,
    padding: 10,
  },
  todoItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  todoTitle: {
    flex: 1,
  },
  editContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingRight: 5,
  },
  editInput: {
    flex: 1,
    padding: 5,
    borderRadius: 4,
    borderColor: "#3a3a3a",
    borderWidth: 1,
  },
});

export default TodoApp;
