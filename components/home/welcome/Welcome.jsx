import {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList  } from 'react-native'
import { useRouter } from 'expo-router'
import { icons, SIZES } from '../../../constants'

import styles from './welcome.style'

const jobTypes = ["T. Completo", "T. Parcial", "Contrato"]

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const router = useRouter()

  // usestate to handle the job type currently selected (full-time by default)
  const [activeJobType, setActiveJobType] = useState("T. Completo")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}> Bienvenid@</Text>
        <Text style={styles.welcomeMessage}> Encuentra tu próximo trabajo</Text>
      </View>

      {/* Search element container */}
      <View style={styles.searchContainer}>

        {/* Search text field. On text change... */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}  
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='¿Qué estás buscando?'
          />
        </View>

        { /* orange search button. On click, perform a search */ }
        <TouchableOpacity style={styles.searchBtn}  onPress={handleClick}>
          <Image 
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* List of the available job types (defined on the jobTypes array). Format: horizontal pill-style list */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          /* Each job type will be a touchable element. We use the activeJobType useffect hook to highlight the current selected option  */ 
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)}
              /* On press, set the useffect hook to the current element and navigate to a route for the selected job type */
              onPress={() => {setActiveJobType(item); router.push(`/search/${item}`)}}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome