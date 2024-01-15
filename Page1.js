import { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, Modal, Alert, Platform, TouchableOpacity } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import * as React from 'react';
import styles from "./styles";
import { filterTitle, filterAutor, filterContent } from "./functions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const Page1 = ({ navigation }) => {
  const [blogEntries, setEntries] = useState([]);
  const [canSee, setCanSee] = useState(false);
  const [entriesOff, setEntriesOff] = useState([])

  const [bigg, setBig] = useState({});
  const [fun1, setFun1] = useState("checked");
  const [fun2, setFun2] = useState("unchecked");
  const [fun3, setFun3] = useState("unchecked");
  const [palabraBuscada, setPalabraBuscada] = useState("");

  const [conection, setConection] = useState(true)

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const conn = state.isConnected;
      console.log("Connection type", state.isConnected);
      conn ? setConection(true) : setConection(false);
      if (conn === false) {
        getOfflineSaves();
        console.log("recuperadossss---------------",)
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'No estas conectado a wifi',
          textBody: 'Conectate a internet para crear una entrada',
        })
      } else {
        getAllBlogEntries();
        console.log("good conection")
      }

    });

    return () => removeNetInfoSubscription();
  }, []);

  const getOfflineSaves = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('name');

      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        console.log(data, "-----------------------data");
        setEntriesOff(data);
      } else {
        console.log("No hay datos guardados offline.");
      }

    } catch (e) {
      console.log(e.message);
    }
  };



  const saveDataOffline = async (arr) => {
    try {
      const res = await AsyncStorage.setItem('name', JSON.stringify(arr));
      console.log(`----$--------------`)
      console.log("---------------guardado offline", arr)
    } catch (e) {
      console.log(e)
    }
  };

  const getAllBlogEntries = async () => {
    try {
      const response = await fetch("https://back-4d602-default-rtdb.firebaseio.com/blog.json", {
        method: "GET"
      });
      const data = await response.json();
      console.log(data)
      const arreglo = Object.entries(data);
      const result = arreglo.map(([id, entry]) => {
        return {
          id,
          ...entry
        };
      });

      console.log(result);
      setEntries(result);
      saveDataOffline(result);

    } catch (er
    ) {
      Alert.alert(er.message)
    } finally {

    }

  }
  console.log(entriesOff, "--------------no wifi")
  return (
    <AlertNotificationRoot>
      <View style={Platform.OS === "ios" ? styles.Page1BackIP : styles.Page1Back}>
        <Text style={{ fontSize: 16, fontFamily: "serif", color: "white", marginVertical: 16 }}>Blog Entries</Text>

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <RadioButton value="btn1" status={fun1} color="black" onPress={() => { setFun1("checked"); setFun2("unchecked"); setFun3("unchecked") }}></RadioButton><Text>Titulo</Text>
          <RadioButton value="btn2" status={fun2} color="black" onPress={() => { setFun2("checked"); setFun1("unchecked"); setFun3("unchecked") }} ></RadioButton><Text>Autor</Text>
          <RadioButton value="btn3" status={fun3} color="black" onPress={() => { setFun3("checked"); setFun1("unchecked"); setFun2("unchecked") }}></RadioButton><Text>Contenido</Text>
        </View>
        <TextInput placeholder="Buscar blog "
          value={palabraBuscada} onChangeText={(val) => setPalabraBuscada(val)}
          style={styles.txtIn}></TextInput>
        <View style={{ flexDirection: "row" }}>
          <Button mode="contained" disabled={conection ? false : true}
            onPress={() => fun1 === "checked" ? filterTitle(palabraBuscada, blogEntries, setEntries, getAllBlogEntries) :
              fun2 === "checked" ? filterAutor(palabraBuscada, blogEntries, setEntries, getAllBlogEntries) :
                filterContent(palabraBuscada, blogEntries, setEntries, getAllBlogEntries)}>
            Buscar</Button>
          <Button mode="contained" disabled={conection ? false : true}
            onPress={() => {
              setPalabraBuscada("");
              getAllBlogEntries();
            }}>Limpiar</Button>
        </View>
        <ScrollView style={styles.scrollV}>
          {
            conection ?
              blogEntries !== undefined ?
                blogEntries.map((ent, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setBig(ent);
                    setCanSee(true)
                  }} style={styles.Touch}>
                    <Text style={styles.texted}>{ent.title}</Text>
                    <Text style={styles.texted}>{ent.autor}</Text>
                    <Text style={styles.texted}>{ent.fecha}</Text>
                    <Text style={styles.texted}>{ent.contenido.slice(0, 69)}</Text>
                  </TouchableOpacity>
                )) :
                <View>
                  <Text>No hay entradas</Text>
                </View>
              :
              entriesOff?.map((ent, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  setBig(ent);
                  setCanSee(true)
                }} style={styles.Touch}>
                  <Text style={styles.texted}>{ent.title}</Text>
                  <Text style={styles.texted}>{ent.autor}</Text>
                  <Text style={styles.texted}>{ent.fecha}</Text>
                  <Text style={styles.texted}>{ent.contenido.slice(0, 69)}</Text>
                </TouchableOpacity>
              ))
          }

        </ScrollView>
        <View style={{ margin: "3%" }}>
          <Button mode="contained" onPress={() => navigation.navigate("Page2")} disabled={conection ? false : true}>
            Crear nueva entrada del Blog</Button>
        </View>
        <Modal visible={canSee} style={styles.bigEntry}>
          <View>
            <Text style={styles.textedB}>{bigg.title}</Text>
            <Text style={styles.textedB}>{bigg.autor}</Text>
            <Text style={styles.textedB}>{bigg.fecha}</Text>
            <Text style={styles.textedB}>{bigg.contenido}</Text>
            <View style={{ position: "relative", width: "40%", marginLeft: "30%" }}>
              <Button mode="contained" onPress={() => setCanSee(false)} >Salir</Button>
            </View>
          </View>

        </Modal>
      </View >
    </AlertNotificationRoot>
  );
}

export default Page1;