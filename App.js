import React, { useState, useEffect } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard
} from 'react-native';

export default function App() {
  const [offset, setOffset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [logo, setLogo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  

    // o Animated.parallel quer dizer que eu quero que duas animações sejam
    // feitas ao mesmo tempo
    Animated.parallel([
      // fazendo a animação ser executada assim que o usuário entra no App.
      // a animação é do eixo Y de baixo para cima
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        // fazendo o efeito de estilingue
        bounciness: 30,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            // aqui vai o estilo que vai ser animado
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}
      >
        <TextInput 
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // alinhar hotizontalmente no centro
    alignItems: 'center',
    // alinhar verticalmente no centro
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  buttonSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#FFF',
  },
});