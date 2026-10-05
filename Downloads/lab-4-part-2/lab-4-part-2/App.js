
import {SafeAreaView, Text, View, TextInput, Button, Alert, StyleSheet} from 'react-native';

import { useState } from 'react';

export default function App() {

  const gradePoints = {
    'F': 0,
    'D': 1.5,
    'C': 2,
    'C+': 2.75,
    'B': 3,
    'B+': 3.5,
    'A': 4
  };

  const [sswd, setSswd] = useState('D');
  const [ob, setOb] = useState('D');

  var gpa = 0;
  var credits = 5;
  var totalPossibleCredits = 10;
  var totalGradeScores = 0;

  function clickMe() {

    Alert.alert("this is the click me button");

    var sswdGradeScore = gradePoints[sswd] * credits;
    totalGradeScores = totalGradeScores + sswdGradeScore;

    var obGradeScore = gradePoints[ob] * credits;
    totalGradeScores = totalGradeScores + obGradeScore;

    gpa = totalGradeScores / totalPossibleCredits;

    alert("Your GPA is " + gpa);
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: "10%",
      paddingLeft: "5%",
      paddingRight: "5%"
    },

    row: {
      flexDirection: "row",
      marginLeft: "5%",
      marginRight: "5%",
      padding: "2%"
    },

    label: {
      width: "70%",
      padding: "2%"
    },

    textInput: {
      width: "30%",
      borderWidth: 1,
      borderColor: "gray",
      padding: "2%"
    }
  });

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.row}>
        <Text style={styles.label}>
          SSWD
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Grade"
          onChangeText={setSswd}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Organisational Behaviour
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Grade"
          onChangeText={setOb}
        />
      </View>

      <View style={styles.row}>
        <Button
          title="submit"
          onPress={clickMe}
        />
      </View>

    </SafeAreaView>
  );
}

