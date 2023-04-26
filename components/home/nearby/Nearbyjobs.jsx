// this component displays the nearby jobs of the api we fetch from, in a list displayed below the popular jobs list
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
// popular job card element
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
// useFetch (makes the request to the API)
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  // destructures the data received from the useFetch hook, passing the endpoint and query as parameters
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      {/* Header and button */}
      <View style={styles.header}>
        <Text styles={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
