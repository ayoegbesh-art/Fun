
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

export default function App() {
  const questions = [
    {
      question: "Which instrument has black and white keys?",
      answers: ["Guitar", "Piano", "Drums", "Violin"],
      correct: "Piano",
    },
    {
      question: "Which instrument usually has six strings?",
      answers: ["Guitar", "Piano", "Flute", "Drums"],
      correct: "Guitar",
    },
    {
      question: "Which instrument is commonly played with drumsticks?",
      answers: ["Violin", "Piano", "Drums", "Guitar"],
      correct: "Drums",
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(
    "Choose an answer!"
  );

  const question = questions[questionIndex];

  const chooseAnswer = (answer) => {
    if (answer === question.correct) {
      setScore(score + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Wrong! The answer was ${question.correct}`);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setMessage("Choose an answer!");
    } else {
      setMessage(`🏆 Game over! Score: ${score}/${questions.length}`);
    }
  };

  const restart = () => {
    setQuestionIndex(0);
    setScore(0);
    setMessage("Choose an answer!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Music Quiz</Text>

      <Text style={styles.score}>
        Score: {score}
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>
          {question.question}
        </Text>
      </View>

      {question.answers.map((answer) => (
        <View style={styles.answer} key={answer}>
          <Button
            title={answer}
            onPress={() => chooseAnswer(answer)}
          />
        </View>
      ))}

      <Text style={styles.message}>
        {message}
      </Text>

      <Button
        title="Next Question ➡️"
        onPress={nextQuestion}
      />

      <View style={styles.restart}>
        <Button
          title="🔄 Restart"
          onPress={restart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  score: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#eee",
    marginBottom: 20,
  },

  question: {
    fontSize: 22,
    textAlign: "center",
  },

  answer: {
    marginBottom: 10,
  },

  message: {
    fontSize: 18,
    textAlign: "center",
    margin: 25,
  },

  restart: {
    marginTop: 15,
  },
});


