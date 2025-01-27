import { Appearance, StyleSheet ,Platform,SafeAreaView,FlatList,ScrollView,View,Text,Image} from "react-native";

import { Colors } from '@/constants/Colors';
import { REPORT_OPTIONS } from '@/constants/Report_tabitems';
//import { REPORT_IMAGES } from '@/constants/Reportimages';
import { create } from "react-test-renderer";

export default function Report_tab() {
    const colorScheme = Appearance.getColorScheme(); // Make sure colorScheme is defined here
    const theme = colorScheme === 'light' ? Colors.dark : Colors.light; // Correctly use the colorScheme variable

    
    const styles = createStyles(theme,colorScheme);

    const Container = Platform.OS ==='web' ? ScrollView : SafeAreaView;

    const separatorComp = <View style={styles.searator}/>

    return(
        <Container>
            <FlatList
              data={REPORT_OPTIONS}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}   //to eliminate scroll bar on mobile
              contentContainerStyle={styles.contentContainer}
              ItemSeparatorComponent={separatorComp}
              renderItem={({item})=>(
                <View>
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                    <Image
                       //source={REPORT_IMAGES[item.id -1 ]}
                        />
                </View>
              )}

         />
        </Container>
    )
}
function createStyles(theme,colorScheme) {
    return StyleSheet.create({
         contentContainer:{
             paddingTop:10,
             paddingBottom:20,
             paddingHorizontal:10,
             backgroundColor:theme.background,
         },
         separator:{
            
         }
    })
}
   
