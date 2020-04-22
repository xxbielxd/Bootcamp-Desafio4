import React,{ useState, useEffect } from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories,setRepositories] = useState([]);
  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const status = response.status;    
    if(status == 200){
      const repositoriesNew = repositories;
      const index = repositoriesNew.findIndex(repositorie=>repositorie.id == id);
      repositoriesNew[index]['likes'] = response.data.likes; 
      setRepositories([...repositoriesNew]);
      return true;
    }
    return false;
  }
  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  },[]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
         data={repositories}
         keyExtractor={repositorie=>repositorie.id}
         renderItem={({item : repositorie})=>(
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repositorie.title}</Text>

            <View style={styles.techsContainer}>

              {repositorie.techs.map((tech)=>(
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))}             
             
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${repositorie.id}`}
              >
                {repositorie.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repositorie.id)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${repositorie.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
         )}
        >
         


        </FlatList>


        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
