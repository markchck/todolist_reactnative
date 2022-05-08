import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { theme } from './color';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({})
  const travel = () => setWorking(false);
  const work =   () => setWorking(true);
  const onChangeText = (payload)=> setText(payload);
  const addToDo = () => {
    if(text === ""){
      return
    }
    const newToDos = Object.assign({}, toDos, { [Date.now()] : {text:text, work:working}, } )
    setToDos(newToDos)
    setText("")
  }
  console.log(toDos["1652017714531"]["work"])
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          placeholder={working? "Add a To do" : "Where do you want to Go?"}
          style={styles.input}
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
          value={text}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
     
  },
  header:{
    flexDirection:"row",
    marginTop: 100,
    justifyContent: "space-between"
  },
  btnText:{
    fontSize: 33,
    fontWeight: "600",
  },
  input:{
    backgroundColor:"white",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  }
});