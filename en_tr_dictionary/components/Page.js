import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {add, increase, decrease, indexReset, indexFull } from '../Redux/Slice';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Page = () => {
    const dispatch = useDispatch();
    const dictionary = useSelector((state)=>state.store_dict);
    const [modal_visible, setModalVisible] = useState(false);
    const [en_word, setEnWord] = useState("");
    const [tr_word, setTrWord] = useState("");

    useEffect(()=>{
        
    },[]);

    const indexPlus = (dictionary) => {
      if(dictionary.index < dictionary.dict.length-1){
        dispatch(increase())
      }

      else if(dictionary.index == dictionary.dict.length-1){
        dispatch(indexReset())
      }
    }

    const indexDecrease = (dictionary) => {
      if(dictionary.index >0){
        dispatch(decrease())
      }
      else if(dictionary.index == 0){
        dispatch(indexFull({index:dictionary.dict.length-1}))
      }
    }

    const addWords = () => {
      if(en_word.length > 0 && tr_word.length > 0){
        const obj = {
          en: en_word,
          tr: tr_word
        }
        dispatch(add(obj));
        setEnWord("");
        setTrWord("")
      }
    }

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={"#F8EDFF"} barStyle={"dark-content"} />

      <Modal visible={modal_visible} animationType='slide'transparent={true} >
        <View style={styles.modal_container} >

          <View style={styles.modal_content} >

            <TouchableOpacity style={styles.off_bar} onPress={()=>{setModalVisible(false)}} >
              <Icon name="xmark" size={width/10} style={styles.off_bar_text}/>
            </TouchableOpacity>

            <View style={styles.modal_texts} >
              <TextInput placeholder='İngilizce kelime' value={en_word} onChangeText={(value)=>{setEnWord(value)}} style={styles.modal_text} />
              <TextInput placeholder='Türkçe kelime' value={tr_word} onChangeText={(value)=>{setTrWord(value)}} style={styles.modal_text} />
            </View>

            <TouchableOpacity style={styles.modal_add_button} onPress={()=>{addWords()}} >
              <Text style={styles.button_text} >EKLE</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

      <Image style={styles.logo} source={require("../Logo.png")}/>      
       
      <View style={styles.content_container} >
        <TouchableOpacity onPress={()=>{indexDecrease(dictionary)}} >
          <Icon name="circle-arrow-left" size={width/10} color="#3D3B40" />
        </TouchableOpacity>           
        
        <View style={styles.words} >
          <Text style={styles.counter} >{dictionary.index + 1 }/{dictionary.dict.length}</Text>
          <Text style={styles.word_en} >{dictionary.dict[dictionary.index].en}</Text>
          <Text style={styles.word_tr}>{dictionary.dict[dictionary.index].tr}</Text>
        </View>

        <TouchableOpacity onPress={()=>{indexPlus(dictionary)}}>
          <Icon name="circle-arrow-right" size={width/10} color="#3D3B40" />
        </TouchableOpacity>        

      </View>

      <View style={styles.button_view} >
        <TouchableOpacity onPress={()=>{setModalVisible(true)}} >
        <Icon name="circle-plus" size={width/8} color="#525CEB" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Page;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F8EDFF",
    position:"relative",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:"3%"
  },
  logo:{
    position:"absolute",
    width:(width*40)/100,
    height:(width*40)/100,
    resizeMode:"contain",
    left:(width*3)/100,
    top:(width*3)/100
  },
  content_container:{
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  words:{
    height:(height*20)/100,
    justifyContent:"center",
    alignItems:"center",
    position:"relative"
  },
  word_en:{
    fontSize:width/10,
    color:"#525CEB",
    fontFamily:"Margarine-Regular"
  },
  word_tr:{
    fontSize:width/15,
    color:"#BFCFE7",
    fontFamily:"Margarine-Regular"
  },
  counter:{
    alignSelf:"center",
    top:0,
    color:"#3D3B40",
    fontFamily:"Margarine-Regular",
    fontSize:width/15
  },
  button_view:{
    position:"absolute",
    bottom: 0,
    right:0,
    marginRight:(width*5)/100,
    marginBottom:(width*5)/100,
  },
  modal_container:{
    flex:1,
    alignItems:"center",
    justifyContent:"flex-end"
  },
  modal_content:{
    width:"80%",
    height:(height*30)/100,
    borderWidth: 1,
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:"#ffffff",
    borderRadius: width/20,
    marginBottom: (height*3)/100,
    paddingHorizontal:"5%",
  },
  modal_texts:{
    width:"100%",
    height:"60%",
    justifyContent:"space-around",
  },
  modal_add_button:{
    width:"50%",
    height:"17%",
    backgroundColor:"#3D3B40" ,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:width/40,
    marginBottom:"4%",
    
  },
  modal_text:{
    backgroundColor:"blue",
    width:"100%",
    maxWidth:"100%",
    height:"35%",
    paddingHorizontal:"5%",
    backgroundColor:"#BFCFE7",
    borderRadius:width/25,
    fontFamily:"Margarine-Regular",
    letterSpacing: 1.5,
    color:"#000000"
  },
  button_text:{
    color:"#ffffff",
    fontSize: width / 25,
    fontFamily:"Margarine-Regular",
    letterSpacing: 1.5,
  },
  off_bar:{
    backgroundColor:"#525CEB",
    top:width/40,
    alignSelf:"flex-end",
    justifyContent:"center",
    alignItems:"center",
    width:(width*7)/100,
    height:(width*7)/100,
    borderRadius:(width*7)/100
  },
  off_bar_text:{
    color: "#ffffff",
    fontSize:(width*5)/100,
  }
})