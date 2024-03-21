import React from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Item {
    id: string;
    nome: string;
    preco: string;
    listaIngrediente: string;
    imagem: any;
}

const dados: Item[] = [
    { id: "1", nome: "Bolo Red Velvet", preco: "R$89,99", listaIngrediente: "Leite,açúcar, ovos,farinha de trigo, Chocolate em Pó,corante líquido cream cheese", imagem: require('./assets/images/redvelvet.png') },
    { id: "2", nome: "Bolo de Brigadeiro", preco: "R$59,99", listaIngrediente: "Leite,manteiga, açúcar, ovos, farinha de trigo, Chocolate em Pó", imagem: require('./assets/images/brigadeiro.png') },
    { id: "3", nome: "Bolo da Elsa", preco: "R$289,99", listaIngrediente: "Leite,ovos,farinha de trigo,açúcar,creme de leite", imagem: require('./assets/images/elsa.png') },
    { id: "4", nome: "Bolo do Bob Esponja", preco: "R$185,99", listaIngrediente: "Leite, manteiga, açúcar, ovos,farinha de trigo, Chocolate em Pó, fermento, corante líquido vermelho", imagem: require('./assets/images/bobesponja.png') },
    { id: "5", nome: "Bolo de casamento", preco: "R$500,86", listaIngrediente: "Leite, açúcar, ovos, farinha de trigo, corante líquido vermelho, açúcar de confeiteiro", imagem: require('./assets/images/casamento.png') },
    { id: "6", nome: "Bolo do Urso", preco: "R$50,00", listaIngrediente: "Leite , suco de limão , manteiga, açúcar, ovos, essência de baunilha, farinha de trigo, Chocolate em Pó, fermento, corante líquido vermelho, cream cheese", imagem: require('./assets/images/urso.png') },
    { id: "7", nome: "Bolo da Ladybug", preco: "R$90,00", listaIngrediente: "Leite, suco de limão , manteiga sem sal, açúcar, ovos,farinha de trigo,fermento em pó, corante líquido vermelho, cream cheese", imagem: require('./assets/images/ladybug.png') },
    { id: "8", nome: "Bolo de Cenoura", preco: "R$20,00", listaIngrediente: "2 cenouras médias,óleo,ovos, Amido de Milho,farinha de trigo, fermento em pó, açúcar,chocolate ao leite, creme de leite ", imagem: require('./assets/images/cenoura.png') },
    { id: "9", nome: "Bolo de Fubá", preco: "R$20,00", listaIngrediente: "Leite, ovos, essência de baunilha, farinha de trigo, Chocolate em Pó", imagem: require('./assets/images/fuba.png') },
    { id: "10", nome: "Bolo de Feijão", preco: "R$9,99", listaIngrediente: "Leite,suco de feijão , manteiga sem sal, açúcar, ovos, farinha de trigo, corante líquido vermelho, açúcar de confeiteiro ", imagem: require('./assets/images/feijao.png') },
    { id: "11", nome: "Bolo de Abobrinha", preco: "R$9,99", listaIngrediente: "Leite, Abobrinha, suco de limão , manteiga sem sal, açúcar, ovos, essência de baunilha, farinha de trigo, Chocolate em Pó, fermento em pó, corante líquido vermelho, cream cheese", imagem: require('./assets/images/abobrinha.png') },
    { id: "12", nome: "Bolo de Abacaxi com Ameixa", preco: "R$69,99", listaIngrediente: "Leite, suco de laranja , ovos, essência de baunilha, farinha de trigo, Chocolate em Pó, fermento em pó, corante líquido vermelho, cream cheese", imagem: require('./assets/images/abacaxi.png') },
    { id: "13", nome: "Bolo de Laranja", preco: "R$20,00", listaIngrediente: "Leite , suco de fubá , manteiga , açúcar, ovos, essência de baunilha, farinha de trigo, Chocolate em Pó, fermento em pó", imagem: require('./assets/images/laranja.png') },
    { id: "14", nome: "Bolo de Limão", preco: "R$20,00", listaIngrediente: "Leite, farinha de trigo, Chocolate em Pó, fermento em pó, corante líquido vermelho, cream cheese", imagem: require('./assets/images/limao.png') },
    { id: "15", nome: "Bolo de Churros", preco: "R$20,00", listaIngrediente: "Leite , corante líquido vermelho, cream cheese", imagem: require('./assets/images/churros.png') },

];
const logo = require('./assets/images/logo.png');

const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item}>
        <Image source={item.imagem} style={styles.image} />
        <View style={styles.text}>
            <Text style={styles.tituloBolos}>{item.nome}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
            {item.listaIngrediente.split(',').map((ingrediente, index) => (
                <Text key={index} style={styles.textColor}>{ingrediente.trim()}</Text>
            ))}
        </View>
    </TouchableOpacity>
);

function FlatListExample(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle='light-content' />
            <View style={styles.header}>
                <Image source={logo} style={styles.logo}/>
            </View>

            <FlatList
                data={dados}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/home.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/orders.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/profile.png')}
                        style={styles.footerIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        source={require('./assets/images/menu.png')}
                        style={styles.footerIcon}
                    />
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
    image:{
        width:130,
        height:100,
        marginRight:25
    },
    textColor:{
        fontWeight: 'bold',
        color: 'black'
    },
    logo:{
        width:130,
        height:100  
    },
    text:{
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,  
    },
    tituloBolos:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20, 
        textAlign: 'center', 
        marginBottom: 10,
    },
    preco:{
        fontWeight:'bold',
        color:'red',
        fontSize:20,
        marginBottom:10,
        backgroundColor:'yellow',
        borderRadius:10
        }

});

export default FlatListExample;