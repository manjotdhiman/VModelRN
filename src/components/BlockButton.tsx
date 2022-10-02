
import React from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
interface IBlockButton {
    loading: boolean,
    title: string,
    onClick: (event: GestureResponderEvent) => void
}
const BlockButton = ({ loading, title, onClick }: IBlockButton) => (
    <TouchableOpacity style={[styles.container, {
        backgroundColor: loading ? '#888' : "rgb(75,52,52)",
    }]} onPress={loading ? () => console.log('Already Loading') : onClick}  >
        {loading && <ActivityIndicator size={'small'} style={{ marginRight: 5 }} color="#fff" />}
        <Text style={styles.text} >{loading ? 'Loading' : title}</Text>
    </TouchableOpacity>
)
export default BlockButton;

const styles = StyleSheet.create({
    container:
    {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5, padding: 10, alignItems: 'center'
    },
    text: { color: '#fff', fontSize: 16, fontFamily: 'SansSerifFLF-Demibold' }

});
