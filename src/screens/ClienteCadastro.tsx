import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from 'axios';

const CadastroProduto: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [endereco,setEndereco] = useState<string>('');
    const[imagem,setImagem] = useState<any>('');

    const cadastrarProduto = async() =>{
        try{
        const formData = new FormData();
        formData.append('nome',nome);
        formData.append('telefone',telefone);
        formData.append('endereco',endereco);
        formData.append('imagem',{
            uri:imagem,
            type:'image/jpeg',
            name:new Date()+'.jpg'
        });

        const response = await axios.post('http://10.137.11.225:8000/api/produtos', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    }catch(error){
        console.log(error);
    }
    }

    const abrirCamera = () => {
        const options = {
            mediaType:'photo',
            includeBase64:false,
            maxHeight:2000,
            maxWidth:2000
        };

        launchCamera(options, response => {
            if(response.didCancel){
                console.log('cancelado pelo usuario');
            } else if (response.error){
                console.log('erro ao abrir a camera');
            }else{
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imageUri);
                console.log(imageUri);
            }
        });
    }    

    const selecionarImagem = () => {
        const options = {
            mediaType:'photo',
            includeBase64: false,
            maxHeight:2000,
            maxWidth:2000 
        };
    
        launchImageLibrary(options,(response)=>{
            if(response.didCancel){
                console.log('cancelado pelo usuário')
            } else if(response.error){
                console.log('erro ao abrir a galeria')
            }else{
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImagem(imageUri);
             }
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor= "#ffdab9" barStyle= "light-content"/>
            <View style={styles.header}>
                <Text style ={styles.headerText}>Oficina do Bolo</Text>
            </View>
       
        <View style ={styles.form}>
            <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome} />
               <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone} />
               <TextInput
            style={styles.input}
            placeholder="endereco"
            value={endereco}
            onChangeText={setEndereco}
            multiline />
             <View style ={styles.alinhamentoImagemSelecionada}>
                {imagem ? <Image source ={{uri:imagem}} style = {styles.imagemSelecionada} /> : null}
             </View>
             <TouchableOpacity style ={styles.imageButton} onPress={selecionarImagem}>
                <Text style = {styles.imageButtonText}>Selecionar Imagem</Text>
             </TouchableOpacity>
             <TouchableOpacity style ={styles.imageButton} onPress={abrirCamera}>
                <Text style = {styles.imageButtonText}>Tirar Foto</Text>
             </TouchableOpacity>
             <TouchableOpacity style ={styles.imageButton}onPress={cadastrarProduto}>
                <Text style = {styles.imageButtonText}>Cadastrar Produto</Text>
             </TouchableOpacity>
             </View>
        </View>
        
    );
}

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        header:{
            backgroundColor: '#ffdab9',
            paddingVertical:10,
            alignItems:'center'
        },
        headerText:{
            fontSize:20,
            fontWeight:'bold',
            color:'black'
        },
        form:{
            padding:10,
            backgroundColor: '#f0f0f0',
            marginBottom:10
        },
        input:{
            height:40,
            borderColor:'gray',
            borderWidth:1,
            marginBottom:10,
            paddingHorizontal:10,
            borderRadius:10
        },
        imageButton:{
            backgroundColor:'#ffdab9',
            padding:10,
            borderRadius:5,
            alignItems:'center',
            marginBottom:10
        },
        imageButtonText:{
            color:'black',
            fontWeight:'bold'
        },
        imagemSelecionada:{
            width:200,
            height:200,
            resizeMode:'cover',
            borderRadius:5,
            marginBottom:5
        },
        alinhamentoImagemSelecionada:{
            alignItems:'center'
        },
        button:{
            backgroundColor:'red',
            padding:10,
            borderRadius:5,
            alignItems:'center',
        },
        buttonText:{
            color:'white',
            fontWeight:'bold'
        }

    });

export default CadastroProduto;