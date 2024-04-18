import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView  } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from 'axios';

const CadastroCliente: React.FC = () => {
    const [Clientes, setClientes] = useState<Cliente[]>([]);
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [foto, setFoto] = useState<any>('');
    
    const logo = require('../assets/images/logo.png');
    const cadastrarCliente = async () => {
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('telefone', telefone);
            formData.append('email', email);
            formData.append('cpf',cpf);
            formData.append('endereco',endereco);
            formData.append('password',password);
            formData.append('foto', {
                uri: foto,
                type: 'image/jpeg',
                name: new Date() + '.jpg'
            });

            const response = await axios.post('http://10.137.11.225:8000/api/cliente/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            
            })
            console.log('Cadastrado com sucesso')
        } catch (error) {
            console.log('Erro ao cadastrar o cliente');
        }
    }

    const abrirCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('cancelado pelo usuario');
            } else if (response.error) {
                console.log('erro ao abrir a camera');
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setFoto(imageUri);
                console.log(imageUri);
            }
        });
    }

    const selecionarfoto = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('cancelado pelo usuário')
            } else if (response.error) {
                console.log('erro ao abrir a galeria')
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setFoto(imageUri);
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ffdab9" barStyle="light-content" />
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>
            


            <View style={styles.form}>
            <Text style={styles.fText}>Cadastro de Clientes</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Cliente"
                    value={nome}
                    onChangeText={setNome} />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone} />
                      <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={setEndereco} />
                      <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf} />
                      <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    multiline />
                <View style={styles.alinhamentofotoSelecionada}>
                    {foto ? <Image source={{ uri: foto }} style={styles.fotoSelecionada} /> : null}
                </View>
                <TouchableOpacity style={styles.imageButton} onPress={selecionarfoto}>
                    <Text style={styles.imageButtonText}>Selecionar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={abrirCamera}>
                    <Text style={styles.imageButtonText}>Tirar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={cadastrarCliente}>
                    <Text style={styles.imageButtonText}>Cadastrar Cliente</Text>
                </TouchableOpacity>
                
            </View>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/orders.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/profile.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/menu.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/carrinho.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

            </View>
            
           
            </ScrollView>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#ffdab9',
        paddingVertical: 10,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    form: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingVertical:30
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    imageButton: {
        backgroundColor: '#ffdab9',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10
    },
    imageButtonText: {
        color: 'black',
        fontWeight: 'bold'
    },
    fotoSelecionada: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 5
    },
    alinhamentofotoSelecionada: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        
    },
    logo:{
        width:130,
        height:100  
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    footer: {
        borderTopWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,

    },
    footerIcon: {
        width: 30,
        height: 30
    },
    fText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical:10
    }


});

export default CadastroCliente;