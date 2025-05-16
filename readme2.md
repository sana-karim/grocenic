we can remove this folders if error occurs

# Kill any running Metro server

killall node

# Remove all build artifacts and cache

rm -rf node_modules
rm -rf android/.gradle
rm -rf android/build
rm -rf android/app/build
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/native
rm -rf ~/.gradle/daemon
rm -rf ~/.metro-cache
rm -rf /tmp/metro-\*

# Reinstall node modules

npm install
