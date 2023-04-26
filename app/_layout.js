import { Stack } from "expo-router"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
// this page ensures that the custom fonts are loaded

SplashScreen.preventAutoHideAsync()

const Layout = () => {
    // load the fonts the app uses, stores true or false on a boolean array for every font if loaded or not loaded
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    })

    // only show the home page if the fonts have been loaded (FontsLoaded boolean array is true)
    const onLayoutRootView = useCallback(async() => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if(!fontsLoaded) {
        return null
    }

    return <Stack onLayout={onLayoutRootView}/>
}

export default Layout