import { View, Text, StyleSheet, ImageBackground,Pressable } from 'react-native';
import { Link } from 'expo-router';
import rctimage from '@/assets/images/featured_ask_help_istock-1.webp';

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={rctimage}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>SAFE CIRCLE</Text>
        <Link href="/Login" style={{marginHorizontal:'auto'}} asChild>
        <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
}

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    //backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 30,
  },
  // link: {
  //   color: 'white',
  //   fontSize: 42,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   textDecorationLine: 'underline',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   padding: 4,
  // },
  button :{
    height:50,
    width:75,
    borderRadius:30,
    backgroundColor: 'rgb(239, 212, 13)',
    justifyContent:'center',
    padding: 15
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignhorizontal:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  }
});