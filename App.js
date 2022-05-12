import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from './color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native-web';

const STORAGE_KEY = "@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({})
  const travel = () => setWorking(false);
  const work =   () => setWorking(true);
  const onChangeText = (payload)=> setText(payload);

  const saveToDos = async(toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }
  const loadToDos = async()=>{
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    console.log(s, JSON.parse(s))
    setToDos(JSON.parse(s))
  }
  useEffect(()=>{
    loadToDos();
  }, []);

  const addToDo = async () => {
    if(text === ""){
      return
    }
    const newToDos = Object.assign({}, toDos, { [Date.now()] : {text:text, working:working}, } )
    // 이 코드가 왜 위에 코드랑 같은지 바로 이해가 안될 수 있는데 이거 A = A +1 과 같은 로직의 코드임.
    // 다만 A와 똑같지는 않고 A`정도로 이해하면 되겠다. (리액트에서는 state를 직접 수정하는걸 금하기 때문에 setState를 수정하거나)
    // ...문법을 써서 A의 복제본인 A`을 만들어서 써야한다.
    // const newToDos = {
    //   ...toDos, 
    //   [Date.now()] : {text: text, working: working},
    // }

    setToDos(newToDos);
    await saveToDos(newToDos)
    setText("");
    // console.log(toDos[1652104358532]);
    // console.log(Object.keys(toDos)[0]);
  }

  
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
        <ScrollView>
          {Object.keys(toDos).map((res)=>(
            toDos[res].working === working? <View key={res} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[res].text}</Text>
            </View> : null
          ))}
        </ScrollView>
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
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  toDo:{
    backgroundColor:theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toDoText:{
    color:"white",
    fontSize: 16,
    fontWeight: "500"
  }
});
