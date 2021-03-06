/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import branch, {BranchEvent} from 'react-native-branch';
import Config from 'react-native-config';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  const readDeepLink = async () => {
    branch.subscribe(({error, params, uri}) => {
      if (error) {
        console.error('Error from Branch: ' + error);
        return;
      }

      // params will never be null if error is null
    });

    let lastParams = await branch.getLatestReferringParams(); // params from last open
    let installParams = await branch.getFirstReferringParams(); // params from original install

    console.log({lastParams});
    console.log({installParams});
  };

  const createLink = async () => {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      'canonicalIdentifier',
      {
        locallyIndex: true,
        title: 'Cool Content!',
        contentDescription: 'Cool Content Description',
        contentMetadata: {
          ratingAverage: 4.2,
          customMetadata: {
            prop1: 'helipad',
            prop2: 'chopper',
            prop3: 'take up',
            prop4: 'ffdfd',
            prop5: 'dsds',
            ssdsds: 'sdsdsdsd',
          },
        },
      },
    );

    let linkProperties = {
      feature: 'share',
      channel: 'facebook',
    };

    let controlParams = {
      $desktop_url: 'http://desktop-url.com/monster/12345',
    };

    let {url} = await branchUniversalObject.generateShortUrl(
      linkProperties,
      controlParams,
    );

    console.log({url});
  };

  useEffect(() => {
    // createLink();
    readDeepLink();
  }, []);

  const handleCommodityVarityDetails = url => {
    console.log('ohh url', url);
    const regexp = /\d/gi;
    const matches_array = url?.match(regexp);
    const commodityVarietyId = matches_array
      ?.map(i => Number(i))
      .join('')
      .toString();
    console.log('id', commodityVarietyId);
    navigate('CommodityVarietyDetails', {
      commodityVarietyId: commodityVarietyId,
    });
  };

  console.log(Config.app_name);

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
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
