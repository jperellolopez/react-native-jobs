// this component displays the most popular jobs of the api we fetch from
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
// popular job card element
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
// useFetch (makes the request to the API)
import useFetch from "../../../hook/useFetch"

const Popularjobs = () => {
  const router = useRouter();
  
  // destructures the data received from the useFetch hook, passing the endpoint and query as parameters
  const {data, isLoading, error, refetch} = useFetch('search', {query: 'React developer', num_pages: 1})
  
  //console.log(data)
  const [selectedJob, setSelectedJob] = useState()
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      {/* Header and button */}
      <View style={styles.header}>
        <Text styles={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Displays the job card list */}
      <View style={styles.cardsContainer}>
        {/* If is loading, show a spinner (activity indicator). If there's an error, show a message. If not, show the card list*/}
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error mostrando resultados. Vuélvalo a intentar</Text>
        ) : (
          <FlatList
            data={data}
            /* renderItem automatically gets the elements from the data prop and iterates them */
            renderItem={({item}) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob} 
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
