import React, { useState, useEffect } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Item {
    id: string;
    nome: string;
    preco: number;
    ingredientes: string;
    imagem: any;
}

const Cardapio = () => {
    const [dados, setDados] = useState<Item[]>([]);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [error, setError] = useState<string | null>(null);

    interface Carrinho {
        [key: string]: number;
    }

    const [carrinho, setCarrinho] = useState<Carrinho>({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Item[]>('http://10.137.11.225/api/produtos');
                console.log('Dados recebidos da API:', response.data);
                setDados(response.data);
                console.log("dados da api" + dados);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
                setError("Ocorreu um erro ao buscar os bolos");
            }
        };

        fetchData();
    }, []);


    const adicionarAoCarrinho = (id: string) => {
        setCarrinho(prevCarrinho => {
            const novoCarrinho = { ...prevCarrinho };
            if (novoCarrinho[id]) {
                novoCarrinho[id]++;
            } else {
                novoCarrinho[id] = 1;
            }
            setMensagemSucesso('Produto adicionado com sucesso');
            // Limpar a mensagem de sucesso após 3 segundos
            setTimeout(() => {
                setMensagemSucesso('');
            }, 3000);
            return novoCarrinho;
        });
    };

    const renderItem = ({ item }: { item: Item }) => {
        const precoFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.preco)

        return(
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item}>
                <Image source={item.imagem ? { uri: item.imagem } : require('./assets/images/limao.png')} style={styles.image} />
                <View style={styles.text}>
                    <Text style={styles.tituloBolos}>{item.nome}</Text>
                    <Text style={styles.preco}>{precoFormatado}</Text>
                    <Text style={styles.textColor}>{item.ingredientes}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => adicionarAoCarrinho(item.id)}>
                <Image source={require('./assets/images/add.png')} style={styles.addIcon} />
            </TouchableOpacity>
        </View>
    );
        }
    const totalCarrinho = Object.values(carrinho).reduce((total, quantidade) => total + quantidade, 0);


const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle='light-content' />
            <View style={styles.header}>
                <Image source={require('./assets/images/logo.png')} style={styles.logo} />
            </View>

            <FlatList
                data={dados}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            {mensagemSucesso && (
                <View style={styles.mensagemSucessoContainer}>
                    <Text style={styles.mensagemSucessoText}>{mensagemSucesso}</Text>
                </View>
            )}

            <View style={styles.footer}>
            <TouchableOpacity onPress={()=>navigation.navigate('Cardapio')}>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('cadastroCliente')}>
                    <Image
                        source={require('../assets/images/orders.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('cadastroProduto')}>
                    <Image
                        source={require('../assets/images/profile.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/menu.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/carrinho.png')}
                        style={styles.footerIcon}
                    />
                    {totalCarrinho > 0 && (
                        <View style={styles.carrinhoBadge}>
                            <Text style={styles.carrinhoBadgeText}>{totalCarrinho}</Text>
                        </View>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#feedc6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#ffdab9',
        alignItems: 'center',
        paddingVertical: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    footer: {
        borderTopWidth: 0.2,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10
    },
    footerIcon: {
        width: 30,
        height: 30
    },
    image: {
        width: 130,
        height: 100,
        marginRight: 25
    },
    textColor: {
        fontWeight: 'bold',
        color: 'black'
    },
    logo: {
        width: 130,
        height: 100
    },
    text: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    tituloBolos: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    preco: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: 'yellow',
        borderRadius: 10
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 8,
    },
    addButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    addIcon: {
        width: 30,
        height: 30,
    }, carrinhoBadge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carrinhoBadgeText: {
        color: 'white',
        fontWeight: 'bold',
    }, mensagemSucessoContainer: {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    mensagemSucessoText: {
        color: '#155724',
        fontSize: 16,
        textAlign: 'center',
    },



});

export default Cardapio;