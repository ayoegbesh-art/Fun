
import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Logo from "./components/logo";

export default function App() {
  const [fullname, setFullname] = useState("Ayomide Egbesakin");
  const [fname, setFname] = useState("Egbesakin");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function buttonClicked() {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    alert(`First Name: ${fname}
Last Name: ${lname}
Date of Birth: ${dob}
Email: ${email}`);
  }

  return (
    <View>
      <Logo />

      <Text>Hello, World {fullname}</Text>

      <TextInput
        placeholder="Enter your name"
        onChangeText={(value) => setFullname(value)}
      />

      <TextInput
        placeholder="Enter your firstname"
        onChangeText={setFname}
      />

      <TextInput
        placeholder="Enter your lastname"
        onChangeText={setLname}
      />

      <TextInput
        placeholder="Enter your date of birth"
        onChangeText={setDob}
      />

      <TextInput
        placeholder="Enter your email"
        onChangeText={setEmail}
      />

      {emailError ? (
        <Text style={{ color: "red" }}>
          {emailError}
        </Text>
      ) : null}

      <Button
        title="SUBMIT"
        onPress={buttonClicked}
      />

      <Text>
        Hello {fname} {lname}. You were born on {dob}
      </Text>
    </View>
  );
}

