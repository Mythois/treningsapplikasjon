/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  // Attributes
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.navTitle}>
            WeTrain
            </Text>
          
          <Text style={styles.sectionTitle}>Programmer</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
              contentInsetAdjustmentBehavior='automatic'
              style={backgroundStyle}>

                <View style={styles.container}>
                  <Text style={styles.item}>Item 1</Text>
                  <Text style={styles.item}>Item 2</Text>
                  <Text style={styles.item}>Item 3</Text>
                  <Text style={styles.item}>Item 4</Text>
                  <Text style={styles.item}>Item 5</Text>
                  <Text style={styles.item}>Item 1</Text>
                  <Text style={styles.item}>Item 2</Text>
                  <Text style={styles.item}>Item 3</Text>
                  <Text style={styles.item}>Item 4</Text>
                  <Text style={styles.item}>Item 5</Text>
                </View>

              </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
/*
<Section title="Step Two">
  Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  screen and then come back to see your edits.
</Section>
*/

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginTop: 25,
    color: 'black'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  navTitle: {
    fontWeight: '700',
    fontSize: 30,
    paddingHorizontal: 20,
    color: 'black',
    marginTop: 32,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
