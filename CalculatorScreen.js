import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView,Modal, StyleSheet } from 'react-native';
import { create, all } from 'mathjs';

const math = create(all);

const CalculatorScreen = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  useEffect(() => {
    updateOutput();
  }, [input]);

  const handlePress = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput('Error');
    }
  };

  const ScientificOperation = (operation) => {
    setInput((prevInput) => prevInput + operation + '(');
  };

  const addToHistory = (calculation) => {
    setHistory((prevHistory) => [calculation, ...prevHistory]);
  };
  const updateOutput = () => {
    try {
      const result = math.evaluate(input);
      if(result===undefined){
        setOutput(0);
      }
      else{
        setOutput(`${input} = ${String(result)}`);
      }
      
    } catch (error) {
      setOutput(input);
    }
  };
  const toggleHistoryModal = () => {
    addToHistory(`${output}`);
    setHistoryModalVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.historyButton} onPress={toggleHistoryModal}>
        <Text>History</Text>
      </TouchableOpacity>
      <Modal visible={isHistoryModalVisible} animationType="slide" transparent>
        <View style={styles.historyModal}>
          <ScrollView>
            {history.map((calculation, index) => (
              <Text key={index} style={styles.historyText}>
                {calculation}
              </Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleHistoryModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.input}>{output}</Text>
      <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => ScientificOperation('sin')}>
          <Text>sin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ScientificOperation('cos')}>
          <Text>cos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ScientificOperation('tan')}>
          <Text>tan</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => ScientificOperation('sqrt')}>
          <Text>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ScientificOperation('^')}>
          <Text>x^y</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}>
          <Text>)</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
          <Text>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
          <Text>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
          <Text>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
          <Text>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
          <Text>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
          <Text>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
          <Text>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
          <Text>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
          <Text>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    margin: 5,
    padding: 20,
  },
  historyContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
  historyButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  historyModal: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
});

export default CalculatorScreen;
