import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

let timer: NodeJS.Timeout | null = null;
let ss = 0;
let mm = 0;
let hh = 0;


export default function App() {
  const [time, setTime] = useState('00:00:00');
  const [botao, setBotao] = useState('VAI');

  function vai() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setBotao('VAI');
    } else {
      timer = setInterval(() => {
        ss++;

        if(ss === 60){
          ss = 0;
          mm++;
        }

        if(mm === 60){
          mm = 0;
          hh++;
        }
        
        
        let format = (hh <10 ? '0' + hh : hh) + ':' 
        + (mm <10 ? '0' + mm : mm) + ':'
        + (ss  <10 ? '0' + ss : ss)
        setTime(format);
      }, 100);
      
      setBotao('PARAR'); // Defina o botão como 'PARAR' quando o timer for iniciado.
    }
  }

  // Use useEffect para limpar o timer quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, []);



  function clear(){
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
  }
  setTime('00:00:00');

  ss = 0;
  mm = 0;
  hh = 0;
}

  return (
    <View style={styles.area}>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.texte}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={clear}>
          <Text style={styles.texte}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
  },
  btnArea: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 17,
    borderRadius: 9,
    backgroundColor: '#f5ce22',
  },
  texte: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontSize: 50,
  },
});
