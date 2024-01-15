import { useState } from "react";
import { TextInput, Text, View, Platform } from "react-native";
import { Button, Modal } from "react-native-paper";
import styles from "./styles";
import { Alert } from "react-native";





const Page2 = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  
  const [contenido, setContenido] = useState("");
  let fecha = new Date().toString();


  const enviarEntrada = async ({ title, autor, fecha, contenido }: { title: string, autor: string, fecha: string, contenido: string }) => {
    const mensaje = { title, autor, fecha, contenido }
    try {
      const response = await fetch("https://back-4d602-default-rtdb.firebaseio.com/blog.json", {
        method: "POST",
        body: JSON.stringify(mensaje),
        headers: {
          "Content-Type": "application/json"
        }
      })
      // const data = response.json()
      console.log("Resultado OK---->", response)
    } catch (err: any) {
      console.log("ERROR--->", err)
      Alert.alert(err)
    }
  }

  return (
    <View style={Platform.OS === "android" ? styles.page2Back : styles.page2BackIP}>
      <Text style={styles.texted}>Crear nueva entrada de Blog</Text>
      <Text>Titulo de la entrada</Text>
      <TextInput value={title} onChangeText={(valorTitulo) => setTitle(valorTitulo)} style={styles.txtIn}
        placeholder="Titulo de la entrada"></TextInput>
      <Text>Autor de la entrada</Text>
      <TextInput value={autor} onChangeText={(valor) => setAutor(valor)} style={styles.txtIn}
        placeholder="Autor de la entrada"></TextInput>
      <Text>Fecha de la entrada</Text>
      
      <TextInput value={fecha}  placeholder="Fecha de la entrada"
        style={styles.txtIn}></TextInput>
      <Text>Contenido de la entrada</Text>
      <TextInput value={contenido} onChangeText={(valor) => setContenido(valor)}
        placeholder="Contenido de la entrada"
        style={styles.txtIn}></TextInput>
      <View style={{ marginVertical: 15 }}>
        <Button mode="contained" buttonColor={(title && autor && fecha && contenido) ? "blue" : "gray"}
          disabled={(title && autor && fecha && contenido) ? false : true} onPress={() => {
            enviarEntrada({ title, autor, fecha, contenido });
            Alert.alert("Entrada creada con exito");
            setAutor("");
            setContenido("");
            setTitle("");
          }}>Enviar</Button>
      </View>
      <Button mode="contained"
        buttonColor="blue"
        onPress={() => navigation.navigate("Page1")}>Cancelar</Button>
      
    </View>
  )
}

export default Page2;