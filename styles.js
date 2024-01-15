import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  txtIn: {
    backgroundColor: "white", borderRadius: 5, margin: 2, width: "70%",
    borderColor: "#444", borderStyle: "solid", color: "#222", fontFamily: "serif",
  },
  texted: {
    color: "#000"
  },
  page2Back: {
    backgroundColor: "green",
    flex: 1, justifyContent: "center",
    alignItems: "center"
  },
  page2BackIP: {
    backgroundColor: "blue",
    flex: 1, justifyContent: "center",
    alignItems: "center"
  },
  Page1Back: {
    backgroundColor: "green", flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  Page1BackIP: {
    backgroundColor: "skyblue", flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  Touch: {
    margin: 5, padding: 3, borderRadius: 5, backgroundColor: "#eee",
    borderStyle: "solid", borderWidth: 1, borderColor: "#999"
  },
  scrollV: {
    backgroundColor: "white",
    width: "99%"
  },
  bigEntry: {
    margin: 20, padding: 30, borderRadius: 5, backgroundColor: "#eee",
    borderStyle: "solid", borderWidth: 1, borderColor: "#999", borderRadius: 19, 
    flexDirection:"column", justifyContent:"center", alignItems:"center",
  },
  textedB:{
    color: "#000", fontSize:19, fontFamily:"serif", margin:10
  },


})

export default styles;