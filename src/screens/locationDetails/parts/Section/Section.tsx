import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './Sections.style.ts';

type Props = {
  title: string;
  content: string;
};

const Section: React.FC<Props> = ({title, content}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export {Section};
