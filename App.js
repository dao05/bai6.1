import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet
} from 'react-native';

export default function App() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Format 0934544344 -> 093 454 4344
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      return [match[1], match[2], match[3]]
        .filter(Boolean)
        .join(' ');
    }
    return cleaned;
  };

  const handleChange = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    const numbersOnly = formatted.replace(/\s/g, '');

    // Validation khi nhập
    if (numbersOnly.length > 0 && numbersOnly.length < 10) {
      setError('Số điện thoại chưa đủ 10 chữ số');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    const numbersOnly = phone.replace(/\s/g, '');

    // Validation khi click
    if (numbersOnly.length !== 10) {
      Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng');
      return;
    }

    Alert.alert('Thành công', 'Số điện thoại hợp lệ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phone}
          onChangeText={handleChange}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  card: {
    width: '90%',
    maxWidth: 360
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30
  },

  label: {
    fontSize: 16,
    fontWeight: '600'
  },

  description: {
    color: '#777',
    marginBottom: 20
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16
  },

  inputError: {
    borderBottomColor: 'red'
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14
  },

  button: {
    backgroundColor: '#1a3cff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});