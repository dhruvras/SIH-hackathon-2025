import i18n from '@/i18n';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function LanguageSwitcher() {
  const [isHindi, setIsHindi] = useState(i18n.language === 'hi');

  const toggleSwitch = () => {
    const newLang = isHindi ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
    setIsHindi(!isHindi);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>English</Text>
      <Switch value={isHindi} onValueChange={toggleSwitch} />
      <Text style={styles.text}>हिन्दी</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', },
  text: { fontSize: 15, marginHorizontal: 7 },
});
