export const drawerWidth = 235;
export const pageSpacing = { py: 3, mx: 5 }
export const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
export const macOS = typeof navigator !== 'undefined' && navigator.platform.indexOf("Mac") === 0;

// Allows for configuration of differnt api keys per environment. 
export const GoogleApiKey = () => {
    if (window.location.hostname.startsWith("dev")) {
        return process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY;
    } else if (window.location.hostname.startsWith("app")) {
        return process.env.REACT_APP_PROD_GOOGLE_MAPS_API_KEY;
    } else if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
        // Locally we expected this value to be set in .env
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    } else if (process.env.NODE_ENV === "test") {
        return "dummy-test-value"
    } else {
        throw new Error("No google maps api key set")
    }
}