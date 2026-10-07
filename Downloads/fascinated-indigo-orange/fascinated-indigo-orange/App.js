import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

   
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter two numbers');
      return;
    }

    let answer;

    switch (operator) {
      case '+':
        answer = n1 + n2;
        break;

      case '-':
        answer = n1 - n2;
        break;

      case '*':
        answer = n1 * n2;
        break;

      case '/':
        if (n2 === 0) {
          setResult('Cannot divide by zero');
          return;
        }
        answer = n1 / n2;
        break;

      default:
        setResult('Invalid operator');
        return;
    }

    setResult(answer.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <Text style={styles.label}>Number 1</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
        placeholder="Enter your first number"
      />

      <Text style={styles.label}>Number 2</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
        placeholder="Enter your second number"
      />

      <Text style={styles.operatorText}>
        Operator: {operator}
      </Text>

      <View style={styles.buttons}>
        <Button title="+" onPress={() => setOperator('+')} />
        <Button title="-" onPress={() => setOperator('-')} />
        <Button title="×" onPress={() => setOperator('*')} />
        <Button title="÷" onPress={() => setOperator('/')} />
      </View>

      <View style={styles.calculateButton}>
        <Button title="Calculate" onPress={calculate} />
      </View>

      <Text style={styles.result}>
        RESULT: {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
  },

  operatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },

  calculateButton: {
    marginBottom: 25,
  },

  result: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});